# Images Folder

Place your historic site images in this folder with the following naming convention:

## Folder Structure:
```
images/
├── sites/
│   ├── site-001/
│   │   ├── hero.jpg (Main large image for site detail page)
│   │   ├── construction.jpg (Gallery image)
│   │   ├── collapse-1907.jpg (Gallery image)
│   │   ├── workers.jpg (Gallery image)
│   │   ├── aerial-view.jpg (Gallery image)
│   │   └── plaque.jpg (CSCE plaque image)
│   ├── site-002/
│   │   ├── hero.jpg
│   │   ├── construction.jpg
│   │   ├── skyline.jpg
│   │   ├── observation-deck.jpg
│   │   ├── night-view.jpg
│   │   └── plaque.jpg
│   └── ... (continue with site-XXX/ folders)
├── hero/
│   ├── hero-bg.jpg (Main hero background image)
│   └── engineering-collage.jpg (Optional engineering imagery)
└── general/
    ├── about-bg.jpg (About page background)
    └── csce-team.jpg (Team or organization photos)
```

## Image Requirements:
- **Hero Images**: 1200x800px minimum, JPG format (for site detail pages)
- **Gallery Images**: 800x600px minimum, JPG format
- **Site Thumbnails**: 400x250px, JPG format (for cards)
- **General Images**: Various sizes as needed

## Naming Convention:
- Each site has its own folder: `site-001/`, `site-002/`, etc.
- **hero.jpg**: Main large image displayed on site detail page
- **Gallery images**: Any descriptive name (construction.jpg, plaque.jpg, etc.)
- Keep filenames lowercase with hyphens

## JSON Integration:
The JSON file references images like this:
```json
"images": {
  "hero": "images/sites/site-001/hero.jpg",
  "gallery": [
    "images/sites/site-001/construction.jpg",
    "images/sites/site-001/workers.jpg",
    "images/sites/site-001/plaque.jpg"
  ]
}
```

## Features:
- **Hero Image**: Large background image on site detail page
- **Image Carousel**: Gallery images displayed in Bootstrap carousel
- **Fallback Images**: Placeholder images if files don't exist
- **Responsive**: Images adapt to different screen sizes