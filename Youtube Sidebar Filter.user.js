// ==UserScript==
// @name         Youtube Sidebar Filter
// @namespace    
// @version      0.1
// @description  Adds filter field to YouTube's sidebar for Subscriptions
// @author       zhal9k
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    var subsList = document.getElementById("guide-channels");
    if (subsList !== null)
    {
        var subsParent = subsList.parentElement;
        var inputFilter = document.createElement("input");
        inputFilter.setAttribute("id", "zhal-subs-filter");
        inputFilter.setAttribute("class", "search-term");
        inputFilter.setAttribute("style", "height: 20px;");
        inputFilter.setAttribute("placeholder", "Filter...");
        inputFilter.setAttribute("onkeyup", "filterElements()");
        subsParent.insertBefore(inputFilter, subsList);

        var filterScript = document.createElement("script");
        filterScript.type = 'text/javascript';
        var code = "" +
            "function filterElements()" +
			"{" +
            "    var inputFilter = document.getElementById(\"zhal-subs-filter\");" +
            "    var filter = inputFilter.value.toUpperCase();" +
            "    var subsList = document.getElementById(\"guide-channels\");" +
            "    var subs = subsList.getElementsByClassName(\"display-name\");" +
            "    var a, i, displayStyle;" +

            "    for (i = 0; i < subs.length; i++)" +
			"	 {" +
            "        a = subs[i].childNodes[1];" +
            "        if (a.innerHTML.toUpperCase().indexOf(filter) > -1)" +
			"		 {" +
            "            getAncestorLI(subs[i]).style.display = \"\";" +
            "        }" +
			"		 else" +
			"		 {" +
            "            getAncestorLI(subs[i]).style.display = \"none\";" +
            "        }" +
            "    }" +
            "}" +
            "" +
            "function getAncestorLI(el)" +
			"{" +
            "    var retval = null;" +
            "    while (el)" +
			"	 {" +
            "        if (el.tagName.indexOf(\"LI\") > -1)" +
			"		 {" +
            "            retval = el;" +
            "            break;" +
            "        }" +
			"		 else if (el.tagName.indexOf(\"UL\") > -1)" +
			"		 {" +
            "            break;" +
            "        }" +
            "        el = el.parentElement;" +
            "    }" +
            "    return retval;"+
            "}";

        try {
            filterScript.appendChild(document.createTextNode(code));
            document.body.appendChild(filterScript);
        } catch (e) {
            filterScript.text = code;
            document.body.appendChild(filterScript);
        }
    }
})();
