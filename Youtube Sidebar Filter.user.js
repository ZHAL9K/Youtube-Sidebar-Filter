// ==UserScript==
// @name         Youtube Sidebar Filter
// @namespace    
// @version      0.2
// @description  Adds filter field to YouTube's sidebar for Subscriptions
// @author       zhal9k
// @match        http*://*.youtube.com/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
    "use strict";

    var filterBar;
    var elements = [ ];

    var subsList = document.getElementById("guide-channels");

    if (subsList !== null)
    {
        addFilterBar();
    }

    function addFilterBar()
    {
        var subsParent = subsList.parentElement;
        filterBar = document.createElement("input");
        filterBar.setAttribute("id", "zhal-subs-filter");
        filterBar.setAttribute("class", "search-term");
        filterBar.setAttribute("style", "height: 20px;");
        filterBar.setAttribute("placeholder", "Filter...");
        filterBar.addEventListener("keyup", function() { filterElements(); }, false);
        subsParent.insertBefore(filterBar, subsList);

        var subNames = subsList.getElementsByClassName("display-name");

        for (var ii = 0; ii < subNames.length; ii++)
        {
            var t = subNames[ii].childNodes[1];
            elements.push({ name: t.innerHTML.toUpperCase(), element: getAncestorLI(subNames[ii]) });
        }
    }

    function filterElements()
    {
        if (filterBar === null)
        {
            filterBar = document.getElementById("zhal-subs-filter");
        }

        var filterBy = filterBar.value.toUpperCase();
        var temp, ii;
        for (ii = 0; ii < elements.length; ii++)
        {
            temp = elements[ii];
            if (temp.name.indexOf(filterBy) > -1)
            {
                if (temp.element.style.display !== "")
                {
                    temp.element.style.display = "";
                }
            }
            else
            {
                if (temp.element.style.display !== "none")
                {
                    temp.element.style.display = "none";
                }
            }
        }
    }

    function getAncestorLI(el)
    {
        var retval = null;
        while (el)
        {
            if (el.tagName.indexOf("LI") > -1)
            {
                retval = el;
                break;
            }
            else if (el.tagName.indexOf("UL") > -1)
            {
                break;
            }
            el = el.parentElement;
        }
        return retval;
    }
})();

