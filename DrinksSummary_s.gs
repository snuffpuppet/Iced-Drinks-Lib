/*
 * A collection of drinks information accross multiple sites
 * Used for:
 *   - calculating new builds
 *   - Syncing to the preview table
 *   - Pushing new drinks targets into the production build tables
 */

/*
 * DrinksSummary
 * @param {Object} date - Date object representing the date of the summary
 * @param {string[]} siteNames - a list of the configured sites we are working with
 * @param {string[]} drinkTypes - a list of the configured drink types we are working with
 */
function DrinksSummary(date, siteNames, drinkTypes) {
  ASSERT_TRUE(typeof date != "undefined" && date instanceof Date, "DrinksSummary: date argument invalid type");
  ASSERT_TRUE(typeof siteNames != "undefined" && siteNames instanceof Array, "DrinksSummary: siteNames argument invalid type");
  ASSERT_TRUE(typeof drinkTypes != "undefined" && siteNames instanceof Array, "DrinksSummary: drinkTypes argument invalid type");
  
  this.siteNames = siteNames
  this.numSites = siteNames.length;
  this.date = date;
  this.drinkTypes = drinkTypes;
  this.site = [];
  for (var si=0; si < siteNames.length; si++) {
    this.site[si] = { siteInfo: new Site(siteNames, si), drinks: new IcedDrinks(drinkTypes)};
  }
}

/*
 * Stringify the DrinksSummary object for printing
 * @returns {string}
 */
DrinksSummary.prototype = {
  toString: function()
  {
    var s="DS (" + this.date + ")\n"
    for (var si=0; si < this.numSites; si++) {
      s += "  " + this.siteNames[si] + ": " + this.site[si].drinks.toString();
    }
    
    return s;
  }
}