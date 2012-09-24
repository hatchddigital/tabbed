/**
 * HATCHD DIGITAL EMPTY COOP WEB APPLICATION FRAMEWORK
 *
 * ATTRIBUTION-NONCOMMERCIAL-SHAREALIKE 3.0 UNPORTED
 *
 * THE WORK (AS DEFINED BELOW) IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
 * COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
 * COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
 * AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.
 *
 * BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
 * TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
 * BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
 * CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
 * CONDITIONS.
 *
 * This code has been developed in house at HATCHD DIGITAL.
 * @see http://hatchd.com.au
 *
 * DEVELOPER USAGE:
 *
 * ALL external libraries and should be imported here, using a buildout
 * application e.g. CodeKit. This vesion of the file should be pretty,
 * well formatted, and only contain code that is unique to your OWN app.
 * Your site should always use /app-min.js when loading, which contains
 * a minified version of this script prepended with all external scripts.
 *
 *
 * REQUIRED
 * @required jquery (v1.7.0+)
 *
 * IMPORTS
 * nil
 *
 * VALIDATION
 * All code must validate with JSHint (http://www.jshint.com/) to be launched
 * within a LIVE web application. NO debug code should remain in your final
 * versions e.g. remove EVERY reference to window.console.log().
 *
 * STYLE
 * All code should be within 79 characters WIDE to meet standard Hatchd
 * protocol. Reformat code cleanly to fit within this tool.
 *
 * _jshint = { "laxcomma": true, "laxbreak": true, "browser": true }
 *
 * TABBED HATCHDLING
 *
 * Creates a user interface for tabbing between a number of items, similar
 * to a gallery. Thetab may contain a list of all tabs and or next and previous
 * buttons to navigate the list.
 */

;(function ($) {

    "use strict";

    var __default_selectors = {
        'current': '.state-current',
        'hidden': '.hide',
        'link': '.tb-link',
        'body': '.tb-body',
        'next': '.tb-next',
        'prev': '.tb-prev'
    };

    var Tabbed = function (element, settings) {
        // Required settings
        this.element = element || false;
        // A valid HTML DOM element must be provided for functionality
        if (!element) {
            return false;
        }
        // Parse default settings
        this.settings = settings || {};
        this.settings.selectors = this.settings.selectors || {};
        // Selectors and data
        this.$element = $(element);
        this.$tab_links = this.$element.find(this._selector('link'));
        this.$current = $(this.$element.find(this._selector('body'))[0]);
        // Hide non-current tabs
        this.$element.find(this._selector('body')+':not('+this._selector('current')+')').addClass(this._selector('hidden',false));
        return this;
    };

    Tabbed.prototype._selector  = function (selector, qualified) {
        var real_selector = false;
        qualified = typeof qualified === "boolean" ? qualified : true;
        if (this.settings.selectors[selector]) {
            real_selector = this.settings.selectors[selector];
        }
        else {
            real_selector = __default_selectors[selector];
        }
        if (!qualified) {
            real_selector = real_selector.replace('.', '');
            real_selector = real_selector.replace('#', '');
        }

        return real_selector;
    };

    /* MODULE PUBLIC METHODS */

    Tabbed.prototype.swap = function (current, next) {
        var $current = $(current)
          , $next = $(next)
          , $next_anchor = this.$tab_links.parent().
                                find('[href="#' + $next.attr('id') + '"]');

        // Remove all reference to the current
        $current.removeClass(this._selector('current', false)).addClass(this._selector('hidden', false));
        this.$tab_links.removeClass(this._selector('current', false));
        this.$tab_links.parent().removeClass(this._selector('current', false));

        // Add all new references to the next
        $next.removeClass(this._selector('hidden', false)).addClass(this._selector('current', false));

        $next_anchor.addClass(this._selector('current', false));
        $next_anchor.parent().addClass(this._selector('current', false));

        // Set module settings
        this.$current = $next;
    };

    // Update tabbed list to set next element as current
    Tabbed.prototype.next = function () {
        var $next;
        // Find the `next` element in the list
        $next = this.$current.next(this._selector('body'));
        if (!$next.length) {
            $next = this.$element.find(this._selector('body'))[0];
        }
        return this.swap(this.$current, $next);
    };

    // Update tabbed list to set previous element as current
    Tabbed.prototype.prev = function () {
        var $prev;
        // Find the `next` element in the list
        $prev = this.$current.prev(this._selector('body'));
        if (!$prev.length) {
            $prev = this.$element.find(this._selector('body')).last();
        }
        return this.swap(this.$current, $prev);
    };

    /* JQUERY PLUGIN */

    $.fn.tabbed = function (options) {

        return this.each(function () {
            var $this = $(this)
              , tabbed = $this.data('tabbed');
            // If we can't find an existing module, create a new one
            if (!tabbed) {
                $this.data('tabbed', (tabbed = new Tabbed(this, options)));
            }
            /* ATTACH EVENTS */
            // Show next list element
            $this.find(tabbed._selector('next')).click(function (e) {
                e.preventDefault();
                tabbed.next();
            });
            // Show previous list element
            $this.find(tabbed._selector('prev')).click(function (e) {
                e.preventDefault();
                tabbed.prev();
            });
            // Show specific list element
            tabbed.$tab_links.each(function () {
                $(this).click(function (e) {
                    e.preventDefault();
                    tabbed.swap(tabbed.$current, $($(this).attr('href')));
                });
            });

        });
    };

}(window.jQuery));
