$(function(){});function getNoUISliderValue(slider,percentage){slider.noUiSlider.on('update',function(){var val=slider.noUiSlider.get();if(percentage){val=parseInt(val);val+='%';}
$(slider).parent().find('span.js-nouislider-value').text(val);});}