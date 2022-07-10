# Leaflet demo
Before run the demo you need to generate tiles from a choosed map image.
You can use [Planet Generator](http://hjemmesider.diku.dk/~torbenm/Planet/) to generate a map according to your needs, e.g.
```bash
./planet -s 0.43 -w 8000 -h 8000 -b -o /tmp/map.bmp
```

Then you need cut the map image to tiles. You can use [gdal2tiles-leaflet](https://github.com/commenthol/gdal2tiles-leaflet)
to do this, e.g.
```bash
./gdal2tiles.py -l -p raster -z 1-8 -w none /tmp/map.bmp ../alcarin-playground/leaflet-demo/public/tiles
```

The important part is that the result tiles must end in `./public/tiles`.

Then you can go with standard CRA steps to run the demo.

Most of the interesting part of the code can be found in [./src/App.tsx](./src/App.tsx) module.
If you choosed different map size or generated different zoom levels that proposed,
you need to edit `mapTextureProps` const in the `App.tsx` module.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
