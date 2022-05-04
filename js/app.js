const slider_bar = document.querySelector('.slider-bar');
const slider_bar_fill = document.querySelector('.slider-bar-fill');
const slider_marker = document.querySelector('.slider-marker');
const slider_container = document.querySelector('.slider-container');
const price_value = document.querySelector('.value');
const price_currency = document.querySelector('.currency');
const billing_period = document.querySelector('.term');
const toggle_button = document.querySelector('.toggle');
const checkbox = document.querySelector('.checkbox');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        console.log('checked');
        // update discount factor
        price_object.dicount_factor = 0.2;
        price_object.previous_price = price_object.price;
        price_object.price = Math.floor(price_object.price * price_object.dicount_factor);
        price_object.billing_term = ' /yearly';

        update_price();

    } else {
        console.log('unchecked');
        // update discount factor
        price_object.dicount_factor = 1;
        price_object.price = price_object.previous_price;
        price_object.billing_term = ' /monthly';
        update_price();
    }
});

function update_price() {
    price_value.innerHTML = price_object.price;
    billing_period.innerHTML = price_object.billing_term;
}

const price_object = {
    price: 16,
    currency: '$',
    billing_term: ' /monthly',
    increment_factor: 0,
    dicount_factor: 1,
    previous_price: 16,
}

//update price on load
document.addEventListener('DOMContentLoaded', () => {
    price_value.innerHTML = price_object.price;
    price_currency.innerHTML = price_object.currency;
    billing_period.innerHTML = price_object.billing_term;
});

// make the slider draggable
slider_container.addEventListener('mousedown', (e) => {
    // get the mouse position
    // const mouse_x = e.pageX;
    const slider_x = slider_bar.offsetLeft;
    const slider_width = slider_bar.offsetWidth;
    console.log(slider_x, slider_width);
    // make the marker draggable
    slider_container.addEventListener('mousemove', (e) => {
        // get the mouse position
        // console.log(e.pageX, 'e.pageX');
        const new_mouse_x = e.pageX;
        const new_slider_x = new_mouse_x - slider_x;
        // scale new_slider_x to 0-100
        const new_slider_percent = new_slider_x / slider_width * 100;
        // ensure new_slider_percent is between 0-100
        const new_slider_percent_scaled = Math.min(Math.max(new_slider_percent, 0), 100);
        
        
       

        // console.log(new_slider_percent_scaled, 'new_slider_percent_scaled');
        // console.log(new_slider_percent, 'new_slider_percent');
        // console.log(new_slider_x, 'new_slider_x');
        // make sure the marker doesn't go off the slider
        if (new_slider_x < 0) {
        slider_marker.style.left = '0px';
        } else if (new_slider_x > slider_width) {
        slider_marker.style.left = slider_width + 'px';
        } else {
        slider_marker.style.left = new_slider_x + 'px';
         //update price value
 
        }
        
        // update the fill
        let increment_factor = Math.floor(new_slider_percent_scaled / 10);
        // console.log('increment_factor', increment_factor);
        // console.log(price_object.price, 'price_object.price');
        //update price value once and only once
        // capture mouse direction
        if (increment_factor !== price_object.increment_factor) {
            // decrease price if mouse is moving left
            if (increment_factor < price_object.increment_factor) {
                price_object.price -= 1;
            } else {
                price_object.price += 1;
            }
            // price_object.price = price_object.price + increment_factor;
            price_value.innerHTML = price_object.price;
            price_object.increment_factor = increment_factor;
        }

        slider_bar_fill.style.width = slider_marker.offsetLeft + 'px';
    });
    
    // stop dragging when the mouse is released
        slider_marker.addEventListener('mouseup', () => {
        slider_container.removeEventListener('mousemove', null);
        slider_container.removeEventListener('mousedown', null);
    });
     slider_container.addEventListener('mouseup', () => {
        slider_container.removeEventListener('mousedown', null);
        slider_container.removeEventListener('mousemove', null);
     });

    });
