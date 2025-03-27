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
      "/lovable-uploads/52f8bdc9-6dcf-4f73-81f0-123dfaab6136.png",
      "/lovable-uploads/93fd18bb-44f2-4715-bd89-c80437f6bc58.png",
      "/lovable-uploads/8d8e087d-5d61-4a22-a84d-0aed4cda3296.png",
      "/lovable-uploads/b0061573-8527-4b10-b0cd-eb871112872e.png",
      "/lovable-uploads/319ce534-0ff4-4eec-bd3c-a8f171296877.png",
      "/lovable-uploads/98b54ec0-cfd1-4df6-8165-6603f5614eca.png",
      "/lovable-uploads/6155973c-1604-403f-a5b1-f2750b72fc7c.png"
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
      // Previously added portrait photos
      "/lovable-uploads/35165458-d377-482d-984c-51b84dd1ba1a.png",
      "/lovable-uploads/075abbdf-316c-46eb-b8fd-cf98142e5562.png",
      "/lovable-uploads/687160df-47d4-4976-be26-ac1bd2652d9a.png",
      "/lovable-uploads/cb484b48-219c-480c-9eb0-0a1aa7b7f24e.png",
      "/lovable-uploads/b9a3bee9-c1c9-4a37-8675-634e7757baef.png",
      "/lovable-uploads/964ace57-df31-47ad-a6d1-926625067159.png",
      // New portrait photos
      "/lovable-uploads/85bc1a59-4427-4850-950a-5887ab28c9a3.png",
      "/lovable-uploads/6e92c8bb-51c2-4292-98dc-bf9d448f8ac8.png",
      "/lovable-uploads/07368c7c-ae35-4a2d-8c62-905772f6a7ba.png",
      "/lovable-uploads/6c7105b9-51b8-4e4f-8e2d-9f88e97d8327.png",
      "/lovable-uploads/4eae1c8a-952d-4afe-a6e6-ed82baeaf317.png",
      "/lovable-uploads/934e8dcf-1bca-42c1-a5a0-28b90431f34d.png",
      "/lovable-uploads/29f7bd98-298c-4d35-8101-1cdb84a4f148.png",
      "/lovable-uploads/d4e645e2-276d-4493-bbec-53466b3d8925.png",
      "/lovable-uploads/384d2374-65da-42cf-bc29-a7b867f91b96.png",
      "/lovable-uploads/2d680aa2-805b-41ae-b178-27272bc77f61.png",
      "/lovable-uploads/fdd79c7f-5f83-4da5-ac22-5a6b693f4639.png",
      "/lovable-uploads/1306a221-90e7-4131-a951-519f1e5138ce.png",
      "/lovable-uploads/47cd0df5-0900-4b44-9cb2-0761e3632d50.png",
      // Original portrait photos
      "/lovable-uploads/0f6cb452-fc0c-4b59-9602-8e319085b405.png",
      "/lovable-uploads/ba435b40-e58d-4056-941b-b678d94161b2.png", 
      "/lovable-uploads/ac897cb9-aed5-49a1-b7d4-30683af25521.png",
      "/lovable-uploads/425b89e7-4e02-4b46-be24-3b31564fe22d.png",
      "/lovable-uploads/b8d1a9ee-bb1c-464b-ad90-06476ae1c855.png",
      "/lovable-uploads/2d6e5613-3e06-4146-bb0f-439aa0ea71d8.png",
      "/lovable-uploads/e159f82e-c7d8-4fa8-8bfb-4727a4423b8a.png",
      "/lovable-uploads/ca1ea03c-7702-451e-8205-8fa4d3a17593.png",
      "/lovable-uploads/86f6709d-ee6f-4040-87b8-5a8011c52f1d.png"
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
    photos: [
      // First image as cover photo (mother with baby in party hat)
      "/lovable-uploads/738d99f3-f340-46e1-9f2d-235b72b2ac56.png",
      // Rest of newly uploaded baby images
      "/lovable-uploads/f92135c5-5c2b-4661-8a97-0ee42fdc6a3d.png", // Baby with cake
      "/lovable-uploads/aa34865b-ba04-418d-a671-1ec012138d64.png", // Girl in pink hat
      "/lovable-uploads/675350a6-37c2-4917-895f-187b4447b594.png", // Baby with graduation cap
      "/lovable-uploads/0d63df17-31e1-4760-af6a-b3b755d3c0a3.png", // Baby in hanging basket
      "/lovable-uploads/da65edcd-5749-4510-975d-4f91c7a1b8e5.png", // Baby with art supplies
      "/lovable-uploads/4ec5d407-c221-4409-8c72-a97e35548c0a.png", // Baby feet in hands
      "/lovable-uploads/828a7f19-7676-44dc-b5e5-c61d7f70d838.png", // Baby with bow
      "/lovable-uploads/4af83747-8fc5-4770-bb96-c7c5f666599a.png", // Boy in suit
      "/lovable-uploads/8f7700cc-a3d1-4d88-858d-4dff4f149aee.png", // Vintage boy photo
      "/lovable-uploads/c2969694-d1c2-4de2-a9d9-df92f715d0d3.png", // Girl in dress
      "/lovable-uploads/1182dafa-f1f9-4714-9820-87d314133bfc.png", // Girl in orange dress
      "/lovable-uploads/e4e9bc63-76bb-4aa5-a7ae-6a38a8a992dc.png", // Father with baby
      "/lovable-uploads/974df090-4427-4786-bd4d-25464ad99873.png", // Baby hand holding finger
      // Existing baby photography images
      "/lovable-uploads/1ff6de7f-bc2c-49fd-a5ba-3e83c262c13b.png",
      "/lovable-uploads/e3a3f9ab-a555-45ab-8a51-c4f716cebd3a.png",
      "/lovable-uploads/f36b9aa0-d2f7-4195-92fd-3a358959f1f7.png",
      "/lovable-uploads/8bfd4647-4eb2-43ee-9f11-585d0bd25164.png",
      "/lovable-uploads/c685ca2d-26c3-4c3b-8601-70d135137df3.png",
      "/lovable-uploads/b18a6857-ff08-4289-a937-90e0f9d2bbb7.png",
      "/lovable-uploads/a6efe3cd-9f46-4176-8104-bdec42a6b4cb.png",
      "/lovable-uploads/c681b5b7-78eb-4f70-9f34-edb3b4858e61.png",
      "/lovable-uploads/0b75fc49-e981-457f-9423-e7357e134c07.png",
      "/lovable-uploads/6069df1c-7815-47d4-a3cb-d05d15140b6f.png",
      "/lovable-uploads/78b11490-f844-4d56-b95d-8f7924dc43cc.png",
      "/lovable-uploads/8d8261c2-619a-48ce-8b92-643b786b97fb.png",
      "/lovable-uploads/d7f54c52-6d94-412e-944f-08c6834ee36e.png",
      "/lovable-uploads/0c6a42b8-06a5-4214-aafe-d2d5ff3f22bb.png",
      // Previous new baby photography images
      "/lovable-uploads/cd2a4e7f-d3ff-4758-a6a5-4789ac244e90.png", 
      "/lovable-uploads/5670f574-7642-4849-b96d-b153465dec2c.png", 
      "/lovable-uploads/739c892e-a3f1-47f6-80b8-1be8edc9288a.png", 
      "/lovable-uploads/6a1eb94b-38b5-4013-90e0-591ca63f0942.png", 
      "/lovable-uploads/8344c612-cc2a-4e08-adfb-85cf751ea59d.png", 
      "/lovable-uploads/d4d8d04a-2e41-4da5-893b-d7afc77a395d.png", 
      "/lovable-uploads/19c99965-3588-4fbe-89b6-58800ae69a67.png", 
      "/lovable-uploads/ef2d0557-ee97-473e-b31b-7728607a772a.png", 
      "/lovable-uploads/9ddf09d8-6a06-48db-a225-548fed6196b8.png", 
      "/lovable-uploads/16fddf72-c661-4bd4-9697-02dd6caa8d9d.png", 
      "/lovable-uploads/e1a255ef-0039-455f-9871-3ae149edc69c.png", 
      "/lovable-uploads/8d1386ed-fc74-4fe9-8c33-f5f9d84bd372.png", 
      "/lovable-uploads/e3a4dcf6-e7c2-4c86-af0a-f0f127854d48.png", 
      "/lovable-uploads/e82c22ae-b915-4bde-af8c-b12c6ac9404b.png"  
    ]
  },
  {
    id: "food-photography",
    name: "Food Photography",
    path: "/food-photography",
    photos: [
      // Adding the new food photography images
      "/lovable-uploads/14a5f3c1-026f-4ac0-a64f-f8f31d7fd34e.png", // Cocktail in blue/green
      "/lovable-uploads/53406d2d-4489-475f-8346-d88edcc2a763.png", // French toast with fruits
      "/lovable-uploads/44d50fab-6407-4a18-b790-a37acc09b58c.png", // Three cocktails
      "/lovable-uploads/65939f60-3eec-4176-82fb-15fc8fb19435.png", // Breakfast plates with French toast
      "/lovable-uploads/b41bdb0b-c2a0-4d32-a9db-aa564133fc42.png", // Coffee with latte art and croissant
      "/lovable-uploads/0a0a95bc-868a-4643-9450-291fb6c0f46d.png", // Various plates with French toast and sandwich
      "/lovable-uploads/b76a92b6-c460-4738-b32a-e74f211dc6d5.png", // Coffee with latte art and croissant close-up
      "/lovable-uploads/fd4f6e75-0004-413f-91be-411b6df4138d.png"  // Coffee with croissant sandwich and tomatoes
    ]
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
    id: "ruracio",
    name: "Ruracio",
    path: "/ruracio",
    photos: []
  },
  {
    id: "wedding-portfolio",
    name: "Wedding Portfolio",
    path: "/wedding-portfolio",
    photos: [
      "/lovable-uploads/b97563f8-4566-45b1-b47f-826535f8338a.png",
      "/lovable-uploads/6412cd47-3539-4a22-b536-5e6eeae80a06.png",
      "/lovable-uploads/3e15ab66-91f3-4ab9-82a9-d45aa45b9571.png",
      "/lovable-uploads/057c9ecf-292c-4bf4-9e40-7eb38691d0c7.png",
      "/lovable-uploads/08cbe168-794c-4df5-a9cb-1301d8e2bd22.png",
      "/lovable-uploads/93d52c37-16ab-4293-800e-46991c46ef51.png",
      "/lovable-uploads/6dc85684-6597-4720-be59-522274c1e47d.png",
      "/lovable-uploads/3a2ffd42-64c9-4178-b025-95c03a290b57.png",
      "/lovable-uploads/b9803e0d-e609-4232-9d5b-1ddaf610d117.png",
      "/lovable-uploads/1cede87c-c79d-46d9-8444-76a0481b72a3.png",
      "/lovable-uploads/3cf1b680-5998-47bd-8cf7-96f999419c09.png",
      "/lovable-uploads/c7c06212-b968-4457-b27a-b296f604e16c.png",
      "/lovable-uploads/97623169-6368-4fba-86d3-a5fdd9ea7954.png",
      "/lovable-uploads/35c34f65-d6f8-493f-94b1-053db09daa11.png",
      "/lovable-uploads/2db6ecfd-a3c1-472a-9676-914a8b6981bd.png",
      "/lovable-uploads/7f253d6f-f849-4623-ac55-a0e1664bc04e.png"
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
