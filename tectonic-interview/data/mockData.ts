import { Look, Product } from "@/types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Elegant Bag",
    description: "Beautiful Bag.",
    price: 79.99,
    imageUrl: "/images/Bag.jpg",
  },
  {
    id: "p2",
    name: "Dastoor",
    description: "Dastoor earning",
    price: 49.99,
    imageUrl: "/images/Dastoor.jpg",
  },
  {
    id: "p3",
    name: "Lovely Kurta",
    description: "Stylish Kurta.",
    price: 89.99,
    imageUrl: "/images/Single-kurta.jpg",
  },
  {
    id: "p4",
    name: "Cozy Shoes",
    description: "Shoes",
    price: 69.99,
    imageUrl: "/images/Shoes.jpg",
  },
  {
    id: "p5",
    name: "Chappal",
    description: "Chappal",
    price: 199.99,
    imageUrl: "/images/chappal.jpg",
  },
  {
    id: "p6",
    name: "Earings",
    description: "Earings.",
    price: 34.99,
    imageUrl: "/images/Earings.jpg",
  },
  {
    id: "p7",
    name: "Party Dress",
    description: "Party dress",
    price: 34.99,
    imageUrl: "/images/party-dress.jpg",
  }
];

export const looks: Look[] = [
  {
    id: "l1",
    title: "Casual Street Style",
    media: [
      {
        id: "m1",
        type: "image",
        url: "/looks/casual-1.jpg",
        src: "/images/Kurta.jpg",
        annotations: [
          {
            id: "a1",
            productId: "p1", // shirt
            x: 35,
            y: 50,
          },
          {
            id: "a2",
            productId: "p3", // jeans
            x: 50,
            y: 70,
          },
          {
            id: "a3",
            productId: "p4", // shoes
            x: 55,
            y: 90,
          }
        ],
      },
      {
        id: "m2",
        type: "image",
        url: "/looks/casual-2.jpg",
        src: "/images/Kurta-new.jpg",
        annotations: [
          {
            id: "a4",
            productId: "p5", // shirt
            x: 45,
            y: 90,
          },
          {
            id: "a5",
            productId: "p3", // jeans
            x: 50,
            y: 65,
          },
          {
            id: "a6",
            productId: "p8", // accessories
            x: 60,
            y: 25,
          }
        ],
      },
    ],
  },
  {
    id: "l2",
    title: "Formal Elegance",
    media: [
      {
        id: "m3",
        type: "image",
        url: "/looks/formal-1.jpg",
        src: "/images/Kurta-new.jpg",
        annotations: [
          {
            id: "a7",
            productId: "p1", // dress
            x: 40,
            y: 50,
          },
          {
            id: "a8",
            productId: "p7", // shoes
            x: 45,
            y: 85,
          },
          {
            id: "a9",
            productId: "p8", // accessories
            x: 35,
            y: 30,
          }
        ],
      },
      {
        id: "m4",
        type: "image",
        url: "/looks/formal-2.jpg",
        src: "/images/Kurta.jpg",
        annotations: [
          {
            id: "a10",
            productId: "p2", // shirt
            x: 35,
            y: 10,
          },
          {
            id: "a11",
            productId: "p3", // jacket
            x: 45,
            y: 30,
          },
          {
            id: "a12",
            productId: "p4", // shoes
            x: 50,
            y: 90,
          }
        ],
      },
    ],
  },
  {
    id: "l3",
    title: "Street Fashion",
    media: [
      {
        id: "m5",
        type: "image",
        url: "/looks/street-1.jpg",
        src: "/images/party-image.jpg",
        annotations: [
          {
            id: "a13",
            productId: "p7", 
            x: 40,
            y: 15,
          }
        ],
      },
      {
        id: "m6",
        type: "image",
        url: "/looks/street-2.jpg",
        src: "/images/party-dress.jpg",
        annotations: [
          {
            id: "a14",
            productId: "p7",
            x: 50,
            y: 85,
          }
        ],
      },
    ],
  },
];

// Helper function to get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
