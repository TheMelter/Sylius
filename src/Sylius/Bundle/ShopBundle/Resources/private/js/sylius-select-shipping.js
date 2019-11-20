import $ from 'jquery';

const handleShippingOptionChange = function handleShippingOptionChange() {
  const shippingPriceElement = $('#sylius-summary-shipping-total');
  const totalPriceElement = $('#sylius-summary-grand-total');
  const getPriceFromString = (str) => {
    const arr = str.match(/(\D+)([\d.]+)/);
    return arr.length ? [arr[1], parseFloat(arr[2])] : null;
  };

  $('[name*="sylius_checkout_select_shipping[shipments][0][method]"]').on('change', (event) => {
    const newShippingPriceStr = $(event.currentTarget)
      .parents('.item')
      .find('.fee')
      .text()
      .trim();

    const [currency, newShippingPrice] = getPriceFromString(newShippingPriceStr);
    const [, shippingPrice] = getPriceFromString(shippingPriceElement.text().trim());
    let [, totalPrice] = getPriceFromString(totalPriceElement.text().trim());
    totalPrice -= (shippingPrice - newShippingPrice);
    shippingPriceElement.text(currency + newShippingPrice.toFixed(2));
    totalPriceElement.text(currency + totalPrice.toFixed(2));
  });
};

$.fn.extend({
  selectShipping() {
    if ($('#sylius-shipping-methods').length > 0) {
      handleShippingOptionChange();
    }
  },
});
