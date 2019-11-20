import $ from 'jquery';

$.fn.extend({
  selectShipping() {
    const element = this;
    const shippingPriceElement = $('#sylius-summary-shipping-total');
    const totalPriceElement = $('#sylius-summary-grand-total');
    const getPriceFromString = (str) => {
      return parseFloat(str.substring(1));
    };

    element.find('[name*="sylius_checkout_select_shipping[shipments][0][method]"]').on('change', (evt) => {
      const target = evt.target;
      const feeStr = $(target).parents('.item').find('.fee').text().trim();
      const fee = getPriceFromString(feeStr);
      const currency = feeStr.substring(0,1);
      const shippingPrice = getPriceFromString(shippingPriceElement.text().trim());
      let totalPrice = getPriceFromString(totalPriceElement.text().trim());
      totalPrice -= (shippingPrice - fee);
      shippingPriceElement.text(currency + fee.toFixed(2));
      totalPriceElement.text(currency + totalPrice.toFixed(2));
    });
  }
});
