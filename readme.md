# Squeezebox
### A *hatchdling* jQuery plugin for tab functionality

This tabbed function is used to quickly build highly-extensable tab boxes
for displaying related, but distinct areas of content in a modern way. We
put little, to no, markup reliance on the markup to allow the most relevant
and modern HTML code you can write.

## Usage

### HTML Markup
The required markup will be an overall wrapper element with a class of your
choosing (it's what you pass to the `jQuery` function!). Inside each link to
a tab must have the class `tb-link` and a `href` pointing to the ID of the
content block to show.

Each content block most contain the class `tb-content` and an ID which is
linked to by the above links.

*Note*: I'm using HAML markup for simplicity, and because it's useful to know.

    .tabbed
        ul
            li
                a.tb-link[href=#section1]
                a.tb-link[href=#section-2]
        #section1.tb-content
        #section2.tb-content

### JavaScript attach
Simple jQuery plugin attach for any tabbed elements you've built. There
are, currently, no options required.

    $('.tabbed').tabbed();

## Credits

@author Jimmy Hillis <jimmy@hatchd.com.au>
@see Hatchd Digital <http://hatchd.com.au>
