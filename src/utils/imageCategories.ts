// This file provides a structured way to organize images by category
// It acts as a central registry for all photo categories in the application

export type PhotoCategory = {
  id: string;
  name: string;
  path: string;
  photos: string[];
}

export const photoCategories: PhotoCategory[] = [
  {
    id: "featured",
    name: "Featured Work",
    path: "/featured",
    photos: [
      "/lovable-uploads/ba435b40-e58d-4056-941b-b678d94161b2.png", 
      "/lovable-uploads/ac897cb9-aed5-49a1-b7d4-30683af25521.png",
      "/lovable-uploads/425b89e7-4e02-4b46-be24-3b31564fe22d.png",
      "/lovable-uploads/b8d1a9ee-bb1c-464b-ad90-06476ae1c855.png",
      "/lovable-uploads/21cc20b6-f76c-47c7-8233-d99e64bfb0bf.png",
      "/lovable-uploads/36a4622e-c19d-4aac-ac60-e671c68783d3.png", 
      "/lovable-uploads/1d8280c9-97c6-4820-8ea9-fd36d6d9541f.png",
      "/lovable-uploads/284c8945-aeed-4a5b-9f09-4daf1032ca4c.png",
      "/lovable-uploads/bff532b6-93c8-455e-a183-e47cb400ff26.png",
      "/lovable-uploads/4ab351f1-4d52-4d41-9bae-a48f8dc3d3e6.png",
      "/lovable-uploads/b771e612-6000-4c2d-b932-84540b6408b2.png",
      "/lovable-uploads/4de73100-2c66-42da-bf9a-2c01e5da3608.png",
      "/lovable-uploads/0f6cb452-fc0c-4b59-9602-8e319085b405.png",
      "/lovable-uploads/52a73045-7993-452f-892e-36508e529e45.png"
    ]
  },
  {
    id: "sports",
    name: "Sports",
    path: "/sports",
    photos: [
      "/lovable-uploads/914d8476-67eb-4b27-ab79-ec12fb60e2b5.png",
      "/lovable-uploads/e159f82e-c7d8-4fa8-8bfb-4727a4423b8a.png",
      "/lovable-uploads/86f6709d-ee6f-4040-87b8-5a8011c52f1d.png",
      "/lovable-uploads/2d6e5613-3e06-4146-bb0f-439aa0ea71d8.png",
      "/lovable-uploads/ca1ea03c-7702-451e-8205-8fa4d3a17593.png"
    ]
  },
  {
    id: "product-photography",
    name: "Product Photography",
    path: "/product-photography",
    photos: [
      "/lovable-uploads/9a04f7a6-26e2-4979-93a3-3eaec907d3b3.png",
      "/lovable-uploads/23268ce3-6a89-46dc-831b-e8396bb12099.png",
      "/lovable-uploads/9a2cdf7f-650f-4da7-8073-855495d22817.png",
      "/lovable-uploads/faccfc85-da26-4c1a-b08b-96b34353b7c1.png",
      "/lovable-uploads/8469600f-9e5b-4794-9302-d272e67af0b8.png"
    ]
  },
  {
    id: "portraits",
    name: "Portraits",
    path: "/portraits",
    photos: [
      "/lovable-uploads/0f6cb452-fc0c-4b59-9602-8e319085b405.png",
      "/lovable-uploads/ba435b40-e58d-4056-941b-b678d94161b2.png", 
      "/lovable-uploads/ac897cb9-aed5-49a1-b7d4-30683af25521.png",
      "/lovable-uploads/425b89e7-4e02-4b46-be24-3b31564fe22d.png",
      "/lovable-uploads/b8d1a9ee-bb1c-464b-ad90-06476ae1c855.png"
    ]
  },
  {
    id: "performances",
    name: "Performances",
    path: "/performances",
    photos: [
      "/lovable-uploads/bff532b6-93c8-455e-a183-e47cb400ff26.png",
      "/lovable-uploads/4ab351f1-4d52-4d41-9bae-a48f8dc3d3e6.png",
      "/lovable-uploads/21cc20b6-f76c-47c7-8233-d99e64bfb0bf.png",
      "/lovable-uploads/36a4622e-c19d-4aac-ac60-e671c68783d3.png", 
      "/lovable-uploads/1d8280c9-97c6-4820-8ea9-fd36d6d9541f.png"
    ]
  },
  {
    id: "baby-photography",
    name: "Baby Photography",
    path: "/baby-photography",
    photos: []
  },
  {
    id: "portfolio",
    name: "Portfolio",
    path: "/portfolio",
    photos: []
  },
  {
    id: "corporate",
    name: "Corporate",
    path: "/corporate",
    photos: []
  },
  {
    id: "documentaries",
    name: "Documentaries",
    path: "/documentaries",
    photos: []
  },
  {
    id: "drone",
    name: "Drone",
    path: "/drone",
    photos: []
  },
  {
    id: "events",
    name: "Events",
    path: "/events",
    photos: []
  },
  {
    id: "food-photography",
    name: "Food Photography",
    path: "/food-photography",
    photos: []
  },
  {
    id: "ruracio",
    name: "Ruracio",
    path: "/ruracio",
    photos: []
  },
  {
    id: "wedding-portfolio",
    name: "Wedding Portfolio",
    path: "/wedding-portfolio",
    photos: []
  }
];

// Utility function to get photos by category
export const getPhotosByCategory = (categoryId: string): string[] => {
  const category = photoCategories.find(cat => cat.id === categoryId);
  return category ? category.photos : [];
};

// Utility function to get all featured photos
export const getFeaturedPhotos = (): string[] => {
  return getPhotosByCategory("featured");
};
