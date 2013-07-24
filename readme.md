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

### HTML

The required markup will be an overall wrapper element with a class of your
choosing. Each links needs the `tabbed-link` class and each body
member needs the `tabbed-body` class + an ID to reference.

Each content block most contain the class `tb-content` and an ID which is
linked to by the above links.

```html
<div class="tabbed">
    <ul>
        <li><a class="tabbed-link" href="#section1">Section One</a>M/li>
        <li><a class="tabbed-link" href="#section2">Section Two</a>M/li>
    </ul>
    <div id="#section1" class="tabbed-body">
        Body for section one
    </div>
    <div id="#section2" class="tabbed-body">
        Body for section two
    </div>
</div>
```

### Javascript

Simple jQuery plugin attach for any tabbed elements you've built. There
are, currently, no options required.

```javascript
$('.tabbed').tabbed();
```

## Credits

- Hatchd Digital <http://hatchd.com.au>
- Jimmy Hillis <jimmy@hatchd.com.au>
