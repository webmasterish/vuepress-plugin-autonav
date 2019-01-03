'use strict';

const PATH	= require('path');
const _			= {
	defaultsDeep: require('lodash.defaultsdeep'),
	isEmpty			: require('lodash.isempty'),
	orderBy			: require('lodash.orderby'),
};

// -----------------------------------------------------------------------------

/**
 * holds relevant functions and data
 */
const PLUGIN = {
	name: 'autonav', // the would also be the key used in frontmatter
};

// -----------------------------------------------------------------------------

/**
 * @return {object}
 */
PLUGIN.get_options_defaults = () =>
{
		
	const out = {
		
		enable: true, // enables/disables everything - control per page using frontmatter
		
	};

	// ---------------------------------------------------------------------------
	
	return out;
	
};
// PLUGIN.get_options_defaults()



/**
 * @return {object}
 */
PLUGIN.get_page_options = ( page, plugin_options ) =>
{
	
	const { frontmatter } = page;

	// ---------------------------------------------------------------------------
	
	// order of options override:
	// - defaults				-> gets set in this file by `PLUGIN.get_default_options()`
	// - plugin options	-> gets set in `config.js`
	// - frontmatter		-> gets set in each page
	
	const options = _.defaultsDeep(
		frontmatter[ PLUGIN.name ],
		plugin_options,
		PLUGIN.get_options_defaults()
	);

	// ---------------------------------------------------------------------------
	
	return options;
	
};
// PLUGIN.get_page_options()



/**
 * @return {array}
 */
PLUGIN.get_auto_nav_items = async ( pages, plugin_options ) =>
{
	
	try {
		
		const items = [];
		
		for ( const page of pages )
		{
			const page_options = PLUGIN.get_page_options( page, plugin_options );
			
			if ( ! page_options.enable )
			{
				continue;
			}
		
			// -----------------------------------------------------------------------
			
			const { title, path } = page;
			
			if ( ! path )
			{
				continue;
			}
		
			// -----------------------------------------------------------------------
			
			const text	= page_options.text	|| title;
			const link	= path;
			const order	= page_options.order|| 0;
		
			// -----------------------------------------------------------------------
			
			if ( text && link )
			{
				const parse_path = PATH.parse( path );
				
				const parent = ( parse_path.root === parse_path.dir ) ? false : parse_path.dir;
		
				// ---------------------------------------------------------------------
				
				const item = { text, link, order, parent };
				
				// ---------------------------------------------------------------------
								
				items.push( item );
			}
		}
		
		// -------------------------------------------------------------------------
		
		if ( _.isEmpty( items ) )
		{
			return;
		}
		
		// -------------------------------------------------------------------------
		
		// @notes: only top level pages are supported for now
		
		const top_level_items = items
														.filter( item => ! item.parent )
														.map( item => {
															const { text, link, order } = item;
															return { text, link, order };
														});
		
		// -------------------------------------------------------------------------
														
		const nav_items = _.orderBy( top_level_items, ['order'], ['asc'] );
		
		// -------------------------------------------------------------------------
		
		return nav_items;
		
	} catch ( err ) {
		
		console.error( err.message );
		
	}
	
};
// PLUGIN.get_auto_nav_items()

// -----------------------------------------------------------------------------

module.exports = ( plugin_options, context ) => ({
	
	async ready() {
	
		const options = _.defaultsDeep(
			plugin_options,
			PLUGIN.get_options_defaults()
		);

		// -------------------------------------------------------------------------
		
		if ( ! options.enable )
		{
			return;
		}

		// -------------------------------------------------------------------------
		
		const { pages, themeConfig } = context.getSiteData ? context.getSiteData() : context;
		
		if ( _.isEmpty( pages ) )
		{
			return;
		}
		
		// -------------------------------------------------------------------------
		
		// bailout if nav already has already been set
		
		if ( ! _.isEmpty( themeConfig.nav ) )
		{
			return;
		}
		
		// -------------------------------------------------------------------------
		
		const nav_items = await PLUGIN.get_auto_nav_items( pages, plugin_options);
		
		if ( _.isEmpty( nav_items ) )
		{
			return;
		}
		
		// -------------------------------------------------------------------------
		
		themeConfig.nav = nav_items;
		
	}
	
});
