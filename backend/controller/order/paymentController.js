//stripre me jake start developine me accept a payment wale se code dekho

const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
  try {
    const { cartItems } = request.body;

    const user = await userModel.findOne({ _id: request.userId });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.email,
      metadata: {
        userId: request.userId,
      },
      line_items: cartItems.map((item, index) => {
        const imagesArray = Array.isArray(item.productId.productImage)
          ? item.productId.productImage.filter(
              (img) => img && img.trim() !== ""
            )
          : [];
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: imagesArray,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URl}/success`,
      cancel_url: `${process.env.FRONTEND_URl}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    response.status(303).json(session);
  } catch (error) {
    response.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
