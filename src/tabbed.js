/*! Hatchling Tabbed - v0.1.1 - 2013-07-24
* https://github.com/hatchddigital/tabbed
* Copyright (c) 2013 Hatchd Digital; Licensed MIT */

/* global define */

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    }
    else {
        // Browser globals
        window.Tabbed = factory(window.jQuery);
    }

}(function ($) {
    'use strict';

    var Tabbed = function (element, options) {
        var that = this;
        this.element = element || false;
        if (!element) {
            return false;
        }
        this.options = options || {};
        this.$el = $(element);
        this.$links = this.$el.find('.tabbed-link');
        // Find and set the initial "current" tab and hide all others
        this.$current = this.$el.find('.tabbed-body.state-active');
        if (!this.$current.length) {
            this.$current = this.$el.find('.tabbed-body').first();
        }
        this.$links.filter('[href="#' + this.$current.attr('id') + '"]').addClass('state-active');
        this.$current.addClass('state-active');
        this.$el.find('.tabbed-body').not('.state-active').addClass('state-hide');
        // Attach events
        this.$el.find('.tabbed-next').on('click', function (e) {
            e.preventDefault();
            that.next();
        });
        this.$el.find('.tabbed-prev').on('click', function (e) {
            e.preventDefault();
            that.prev();
        });
        this.$links.each(function () {
            $(this).click(function (e) {
                var next = that.$el.find($(this).attr('href'));
                e.preventDefault();
                that.activate(next);
            });
        });
        return this;
    };

    Tabbed.prototype.activate = function (next) {
        var $next = $(next);
        var _id = $next.attr('id');
        var $next_anchor = this.$links.filter('[href="#' + _id + '"]');
        // Remove all reference to the current
        this.$current.removeClass('state-active').addClass('state-hide');
        this.$links.removeClass('state-active');
        // Add all new references to the next
        $next.removeClass('state-hide').addClass('state-active');
        $next_anchor.addClass('state-active');
        this.$current = $next;
    };

    // Update tabbed list to set next element as current
    Tabbed.prototype.next = function () {
        var $next;
        // Find the `next` element in the list
        $next = this.$current.next('.tabbed-body');
        if (!$next.length) {
            $next = this.$el.find('.tabbed-body')[0];
        }
        return this.activate($next);
    };

    // Update tabbed list to set previous element as current
    Tabbed.prototype.prev = function () {
        var $prev;
        // Find the `next` element in the list
        $prev = this.$current.prev('.tabbed-body');
        if (!$prev.length) {
            $prev = this.$el.find('.tabbed-body').last();
        }
        return this.activate($prev);
    };

    /* JQUERY PLUGIN */

    $.fn.tabbed = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tabbed = new Tabbed(this, options);
        });
    };

    return Tabbed;

}));
