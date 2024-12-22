export const categoriesTabs = [
    {
      id: 0,
      label: 'All',
    },
    {
      id: 1,
      label: "Videos",
    },
    {
      id: 2,
      label: "Liked",
    },
    {
      id: 3,
      label: 'Favorite',
    },
  ];

  export const feedsFilter = [
    {id: 1, thumbnail: require('../images/reel1.jpg'), views:10},
    {id: 2, thumbnail: require('../images/reel2.png'), views:240},
    {id: 3, thumbnail: require('../images/captured.jpg'), views:20},
    {id: 4, thumbnail: require('../images/reelsBg.jpg'), views:20},
    {id: 5, thumbnail: require('../images/profile.png'), views:560},
    {id: 6, thumbnail: require('../images/reel1.jpg'), views:50},
    {id: 7, thumbnail: require('../images/reelsBg.jpg'), views:20},
    {id: 8, thumbnail: require('../images/profile.png'), views:560},
    {id: 9, thumbnail: require('../images/reel1.jpg'), views:50},
    {id: 10, thumbnail: require('../images/reel1.jpg'), views:10},
    {id: 11, thumbnail: require('../images/reel2.png'), views:240},
    {id: 12, thumbnail: require('../images/captured.jpg'), views:20},
  ];
  export const filters = [
    { name: "blur", command: "gblur=sigma=10" },  // Apply Gaussian blur
    { name: "grayscale", command: "hue=s=0" },  // Convert video to grayscale
    { name: "rotate_90", command: "transpose=1" },  // Rotate video 90 degrees clockwise
    { name: "scale_720p", command: "scale=1280:720" },  // Scale video to 720p resolution
    { name: "mirror", command: "hflip" },  // Horizontally flip the video (mirror effect)
    { name: "invert", command: "negate" },  // Invert the colors of the video
    { name: "sepia", command: "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131" },  // Apply sepia tone
    // { name: "cinematic", command: "eq=contrast=1.5:brightness=0.05:saturation=1.2" },  // Cinematic look
    { name: "film", command: "curves=preset=vintage" },  // Film-style vintage look
    // { name: "sl_kodak", command: "lut3d=file=KodakLUT.cube" },  // SL Kodak effect (requires LUT file)
    { name: "sl_blue", command: "colorbalance=bs=0.5" }  // SL Blue (blue tint effect)
  ];

  export const fontFamilyArray = [
    {
      name: 'BEBAS NEUE',
      family: 'BebasNeue-Regular',
      path: '../../assets/fonts/BebasNeue-Regular.ttf',
    },
    {
      name: 'Oswald',
      family: 'Oswald-Regular',
      path: '../../assets/fonts/Oswald-Regular.ttf',
    },
    {
      name: 'Helvetica Neue',
      family: 'HelveticaNeueMedium',
      path: '../../assets/fonts/HelveticaNeueMedium.otf',
    },
    {
      name: 'Lobster',
      family: 'Lobster-Regular',
      path: '../../assets/fonts/Lobster-Regular.ttf',
    },
    {
      name: 'Poppins',
      family: 'Poppins-Regular',
      path: '../../assets/fonts/Poppins-Regular.ttf',
    },
    {
      name: 'Playfair',
      family: 'Playfair_144pt-Regular',
      path: '../../assets/fonts/Playfair_144pt-Regular.ttf',
    },
    {
      name: 'Raleway',
      family: 'Raleway-Regular',
      path: '../../assets/fonts/Raleway-Regular.ttf',
    },
  ];