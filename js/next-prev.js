// JavaScript Document
$(document).ready(function() {
                if ($(".app-wrapper").length === 0) {
                    return;
                }

                var $targetUl = $(".source-pagination li"),
                    $currentID = $(".app-wrapper").attr('id'),
                    $targetListItems = $("nav.app-pagers ul li"),
                    $targetBackLink = $("nav.app-pagers ul li.prev"),
                    $targetForwardLink = $("nav.app-pagers ul li.next");
                
                console.log("Current ID: " + $currentID);
                
                $targetUl.each(function() {
                    var itemID = $(this).data('id');
                    if (itemID == $currentID) {
                        var backLink = $(this).prev().find("a").attr("href");
                        var forwardLink = $(this).next().find("a").attr("href");
                        
                        // found forward link
                        if (forwardLink != undefined) {
                            $targetForwardLink.find("a").attr("href", forwardLink);
                        } else {
                            $targetForwardLink.hide();
                        }
                        
                        // found back link
                        if (backLink != undefined) {
                            $targetBackLink.find("a").attr("href", backLink);
                        } else {
                            $targetBackLink.hide();
                        }
                        
                        
                    }
                    
                });
            });