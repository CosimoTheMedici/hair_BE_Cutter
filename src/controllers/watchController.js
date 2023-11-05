const jwt = require("jsonwebtoken");

const WatchManiaModel = require("../models/watchModel");
const { sendResponse } = require("../middleware/response");
require('dotenv').config();


exports.getALLProducts = (req, res) => {
  WatchManiaModel.fetchProducts((err, results) => {
    console.log("resuts", results);

    if (err) {
      console.log(err);
      //res.json(data);
      return sendResponse(res, 0, "", 500, "something went wrong" + err);
    }
    return sendResponse(res, 1, results, 200, "data");
  });
};
exports.addProductToCart1 = (req, res) => {
  const data = req.params.id;

  WatchManiaModel.createCookie(data, (err, results) => {
    console.log("results", results);
    console.log("req", req);

    if (err) {
      console.log(err);
      return sendResponse(res, 0, "", 500, "something went wrong" + err);
    }
    return sendResponse(res, 1, results, 200, "data");
  });
};
exports.addProductToCart = async (req, res) => {
  const dataParams = req.params.id;
  const data = req.data;
  const cookies = req.cookies;
  const cookiesheader = req.headers.cookie;

  console.log("req cookie header", cookiesheader);
  console.log("req ----- data", data);
  try {
    if (!cookies || !cookies.jwt) {
      console.log("no cookie");
    } else {
      //cookie has been sent from front en,d
      const unitData = await WatchManiaModel.fetchCart(data);
      if (!unitData) {
        //structure the cookie and save it
      } else {
        //get saved cookie update it and save it

        const productCookie = jwt.sign(
          { cookieheader: cookiesheader },
          { cookie: cookies },
          process.env.PRODUCT_COOKIE_TOKEN_SECRET
        );
        console.log(productCookie);
      return sendResponse(res, 1, productCookie, 200, "data");


      }
    }
  } catch (error) {}
  // WatchManiaModel.addToCart(data, (err, results) => {
  //   console.log("results", results);
  //   if (err) {
  //     console.log(err);

  //     return sendResponse(res, 0, "", 500, "something went wrong" + err);
  //   }
  //   const productCookie = jwt.sign(
  //     { result: results },
  //     process.env.REFRESH_TOKEN_SECRET
  //   );

  //   console.log("refreshToken.length", refreshToken);
  //   console.log("accessToken.length", accessToken);

  //   res.cookie("productId", productCookie, { maxAge: 900000, httpOnly: true });

  //   return sendResponse(res, 1, results, 200, "data");
  // });
};
exports.likeProduct = (req, res) => {
  console.log("req",     process.env.PRODUCT_COOKIE_TOKEN_SECRET
  );
  return sendResponse(res, 1, process.env.PRODUCT_COOKIE_TOKEN_SECRET, 200, "data");
  const data = req.body;
  const productCookie = jwt.sign(
    { data: data },
    process.env.PRODUCT_COOKIE_TOKEN_SECRET
  );
  console.log("req", productCookie);
  res.cookie("jwt", productCookie, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  WatchManiaModel.likeProduct(data, (err, results) => {
    console.log("results", results);
    if (err) {
      console.log(err);
      return sendResponse(res, 0, "", 500, "something went wrong" + err);
    }

    return sendResponse(res, 1, results, 200, "data");
  });
  
};

// exports.addProductToCart = async (req, res) => {
//   const productId = req.params.id;
//   const newProduct = req.data; // Assuming req.data contains product details

//   try {
//       // Fetch the existing cart data
//       let cart = await fetchCart(); // You need to implement this function to fetch the existing cart data

//       // Check if the product is already in the cart
//       const existingProductIndex = cart.findIndex(item => item.id === productId);

//       if (existingProductIndex !== -1) {
//           // Product is already in the cart, update quantity or perform other actions as needed
//           cart[existingProductIndex] = newProduct; // Update the existing product with new data
//       } else {
//           // Product is not in the cart, add it to the cart array
//           cart.push(newProduct);
//       }

//       // Save the updated cart data
//       await saveCart(cart); // You need to implement this function to save the updated cart data

//       // Respond with success message or updated cart data
//       res.status(200).json({ message: 'Product added to cart successfully', cart });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
