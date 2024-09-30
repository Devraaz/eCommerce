import React from "react";

const ProductPricing = ({
  total_amount,
  net_amount,
  total_discount,
  shipping_charge,
}) => {
  return (
    <>
      <div className="mx-2 my-3 h-96 w-80 border p-2 shadow-lg">
        <div className="heading mb-3 w-full text-center text-xl font-medium text-primary">
          Order Details
        </div>

        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-gray-600">
                Description
              </th>
              <th class="px-4 py-3 text-right font-semibold text-gray-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr>
              <td class="px-4 py-3 text-gray-600">Subtotal</td>
              <td class="px-4 py-3 text-right text-gray-600">
                ₹{total_amount}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-gray-600">Discount</td>
              <td class="px-4 py-3 text-right text-gray-600">
                -₹{total_discount}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-gray-600">Shipping</td>
              <td class="px-4 py-3 text-right text-gray-600">
                ₹{shipping_charge}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-gray-600">Total</td>
              <td class="px-4 py-3 text-right font-semibold text-gray-600">
                ₹{net_amount + shipping_charge}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductPricing;
