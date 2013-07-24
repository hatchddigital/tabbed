# Tabbed
### A tablike jQuery plugin

## Requirements and Supports

- requireJS
- jQuery

This tabbed function is used to quickly build highly-extensable tab boxes
for displaying related, but distinct, areas of content in a modern way. Can
work with any markup which contains a set of "link"-elements with relations
to a set of "block"-elements.

## Usage

You must have jQuery installed. You may, if you wish, use this plugin within
jQuery otherwise the $.fn.tabbed will be added to the global jQuery.

### HTML Markup

The required markup will be an overall wrapper element with a class of your
choosing (it's what you pass to the `jQuery` function!). Inside each link to
a tab must have the class `tb-link` and a `href` pointing to the ID of the
content block to show.

Each content block most contain the class `tb-content` and an ID which is
linked to by the above links.

    .tabbed
        ul
            li
                a.tabbed-link[href=#section1]
                a.tabbed-link[href=#section-2]
        #section1.tabbed-ody
        #section2.tabbed-body

### JavaScript attach

Simple jQuery plugin attach for any tabbed elements you've built. There
are, currently, no options required.

    $('.tabbed').tabbed();

## Credits

@author Hatchd Digital <http://hatchd.com.au>
@author Jimmy Hillis <jimmy@hatchd.com.au>
