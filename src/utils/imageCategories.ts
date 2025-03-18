
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
    id: "baby-photography",
    name: "Baby Photography",
    path: "/baby-photography",
    photos: [
      // Will be populated as images are uploaded
      "/lovable-uploads/4de73100-2c66-42da-bf9a-2c01e5da3608.png" // Example baby photo
    ]
  },
  {
    id: "portfolio",
    name: "Portfolio",
    path: "/portfolio",
    photos: [
      // Will be populated as images are uploaded
      "/lovable-uploads/b771e612-6000-4c2d-b932-84540b6408b2.png" // Example portfolio photo
    ]
  },
  {
    id: "corporate",
    name: "Corporate",
    path: "/corporate",
    photos: [
      // Will be populated as images are uploaded
      "/lovable-uploads/52a73045-7993-452f-892e-36508e529e45.png" // Example corporate photo
    ]
  },
  {
    id: "documentaries",
    name: "Documentaries",
    path: "/documentaries",
    photos: [
      // Will be populated as images are uploaded
    ]
  },
  {
    id: "drone",
    name: "Drone",
    path: "/drone",
    photos: [
      // Will be populated as images are uploaded
    ]
  },
  {
    id: "events",
    name: "Events",
    path: "/events",
    photos: [
      // Will be populated as images are uploaded
      "/lovable-uploads/36a4622e-c19d-4aac-ac60-e671c68783d3.png" // Example event photo
    ]
  },
  {
    id: "food-photography",
    name: "Food Photography",
    path: "/food-photography",
    photos: [
      // Will be populated as images are uploaded
    ]
  },
  {
    id: "performances",
    name: "Performances",
    path: "/performances",
    photos: [
      // Will be populated as images are uploaded
      "/lovable-uploads/bff532b6-93c8-455e-a183-e47cb400ff26.png",
      "/lovable-uploads/4ab351f1-4d52-4d41-9bae-a48f8dc3d3e6.png"
    ]
  },
  {
    id: "portraits",
    name: "Portraits",
    path: "/portraits",
    photos: [
      // Will be populated as images are uploaded
      "/lovable-uploads/0f6cb452-fc0c-4b59-9602-8e319085b405.png"
    ]
  },
  {
    id: "product-photography",
    name: "Product Photography",
    path: "/product-photography",
    photos: [
      // Will be populated as images are uploaded
    ]
  },
  {
    id: "ruracio",
    name: "Ruracio",
    path: "/ruracio",
    photos: [
      // Will be populated as images are uploaded
    ]
  },
  {
    id: "sports",
    name: "Sports",
    path: "/sports",
    photos: [
      // Will be populated as images are uploaded
    ]
  },
  {
    id: "wedding-portfolio",
    name: "Wedding Portfolio",
    path: "/wedding-portfolio",
    photos: [
      // Will be populated as images are uploaded
    ]
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
