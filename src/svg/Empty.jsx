import React from "react";
import * as RN from "react-native";
import Svg, {
  Circle,
  Ellipse,
  inlineStyles,
  Path,
  Text,
  G,
} from "react-native-svg";

import * as sizes from "../constants/sizes";
import { EMPTY_SEARCH } from "../constants/texts";

export const Empty = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Capa_1"
      x={0}
      y={0}
      style={{
        enableBackground: "new 0 0 1125 990.77",
      }}
      viewBox="0 0 1125 990.77"
      {...props}
    >

      <Path
        d="M712.78 863.88s-622.8 68.21-572.84-277.23c45.14-312.09 343.64-274.08 463.11-395.22s387.73-51.92 444.17 112.48c56.44 164.41 19.37 517.72-334.44 559.97z"
        style={{
          fill: "none",
          stroke: "#0f0f0e",
          strokeMiterlimit: 10,
        }}
      />
      <Path
        d="M678.75 833.97S17.32 906.41 70.38 539.54c47.94-331.45 364.95-291.08 491.83-419.73s411.78-55.14 471.72 119.46 20.57 549.83-355.18 594.7z"
        className="st1"
        style={{
          fill: "#e7fd7b",
        }}
      />
      <Path
        d="M74.91 637.48c67.84 256.35 604.37 197.6 604.37 197.6 169.95-20.3 271.08-108.17 325.33-214.49-44.97-19.97-176.89-65.48-445.34-65.48-294.57-.01-446.76 64.01-484.36 82.37z"
        style={{
          fill: "#e2f26d",
        }}
      />
      <Circle
        cx={561.13}
        cy={494.19}
        r={319.74}
        style={{
          opacity: 0.24,
          fill: "#fff",
        }}
      />
      <Path
        d="M811.48 118.29c-2.68-8.73-2.6-18.44.25-29.12s8.75-20.62 17.69-29.81c8.94-9.19 20.58-15.98 34.92-20.39 13.32-4.1 25.84-5.26 37.56-3.48 11.71 1.78 21.65 6.04 29.81 12.79 8.16 6.75 13.77 15.08 16.82 25 2.4 7.81 2.92 15.15 1.56 22-1.36 6.86-3.57 13.09-6.62 18.71-3.05 5.62-8.67 15.22-16.87 28.8-2.25 3.81-3.98 7.08-5.2 9.82-1.22 2.74-2.01 5.15-2.38 7.22-.37 2.08-.53 4.09-.48 6.03.04 1.95.25 5.33.63 10.14 1.19 10.1-2.81 16.55-12 19.38-4.78 1.47-9.28 1.14-13.5-.98-4.22-2.12-7.28-6.26-9.17-12.42-2.37-7.72-3.24-14.77-2.58-21.16.65-6.39 2.29-12.32 4.93-17.81 2.64-5.49 6.41-12.2 11.31-20.15 4.3-6.95 7.36-12.14 9.17-15.57a41.69 41.69 0 0 0 3.93-10.79c.8-3.77.62-7.53-.53-11.3-2.26-7.35-6.9-12.71-13.92-16.09-7.02-3.37-14.85-3.73-23.49-1.08-10.11 3.11-16.77 7.95-19.98 14.52-3.21 6.57-4.94 15.33-5.2 26.27.07 11.35-4.26 18.36-12.99 21.04-5.15 1.58-10.05 1.11-14.7-1.44-4.69-2.52-7.67-5.91-8.97-10.13zm113.73 130.39c-5.61 1.72-11.06 1.41-16.36-.93-5.3-2.34-8.95-6.78-10.96-13.3-1.78-5.79-1.26-11.28 1.57-16.48 2.83-5.19 7.18-8.7 13.06-10.5 5.79-1.78 11.27-1.3 16.43 1.43 5.17 2.74 8.64 7 10.42 12.79 1.98 6.43 1.47 12.12-1.54 17.07-2.99 4.94-7.2 8.25-12.62 9.92z"
        className="st4"
        style={{
          enableBackground: "new",
        }}
      />
      <G
        className="st4"
        style={{
          enableBackground: "new",
        }}
      >
        <Path
          d="M850.02 150.51c-2.68-8.73-2.6-18.44.25-29.12s8.75-20.62 17.69-29.81c8.94-9.19 20.58-15.98 34.92-20.39 13.32-4.1 25.84-5.26 37.56-3.48 11.71 1.78 21.65 6.04 29.81 12.79 8.16 6.75 13.77 15.08 16.82 25 2.4 7.81 2.92 15.15 1.56 22-1.36 6.86-3.57 13.09-6.62 18.71-3.05 5.62-8.67 15.22-16.87 28.8-2.25 3.81-3.98 7.08-5.2 9.82-1.22 2.74-2.01 5.15-2.38 7.22-.37 2.08-.53 4.09-.48 6.03.04 1.95.25 5.33.63 10.14 1.19 10.1-2.81 16.55-12 19.38-4.78 1.47-9.28 1.14-13.5-.98-4.22-2.12-7.28-6.26-9.17-12.42-2.37-7.72-3.24-14.77-2.58-21.16.65-6.39 2.29-12.32 4.93-17.81 2.64-5.49 6.41-12.2 11.31-20.15 4.3-6.95 7.36-12.14 9.17-15.57a41.69 41.69 0 0 0 3.93-10.79c.8-3.77.62-7.53-.53-11.3-2.26-7.35-6.9-12.71-13.92-16.09-7.02-3.37-14.85-3.73-23.49-1.08-10.11 3.11-16.77 7.95-19.98 14.52-3.21 6.57-4.94 15.33-5.2 26.27.07 11.35-4.26 18.36-12.99 21.04-5.15 1.58-10.05 1.11-14.7-1.44-4.69-2.52-7.67-5.9-8.97-10.13zm113.73 130.4c-5.61 1.72-11.06 1.41-16.36-.93-5.3-2.34-8.95-6.78-10.96-13.3-1.78-5.79-1.26-11.28 1.57-16.48 2.83-5.19 7.18-8.7 13.06-10.5 5.79-1.78 11.27-1.3 16.43 1.43 5.17 2.74 8.64 7 10.42 12.79 1.98 6.43 1.47 12.12-1.54 17.07-2.99 4.94-7.2 8.25-12.62 9.92z"
          className="st5"
          style={{
            fill: "none",
            stroke: "#000",
            strokeMiterLimit: 10,
          }}
        />
      </G>
      <Path
        d="M228.68 542.15c-1.79 2.57-4.25 4.11-7.38 4.63-5.31.88-9.44-1.68-12.4-7.68-3.02-5.71-6.23-9.87-9.66-12.49-3.42-2.62-8.21-3.42-14.36-2.4-5.26.87-9.29 3.12-12.11 6.75-2.82 3.63-3.86 7.68-3.11 12.15.38 2.29 1.28 4.33 2.69 6.1a24.39 24.39 0 0 0 4.91 4.66c1.86 1.33 4.84 3.26 8.94 5.8 4.68 2.9 8.43 5.46 11.27 7.66s5.27 4.9 7.29 8.1c2.03 3.2 3.43 7.14 4.21 11.84.62 3.75.1 6.74-1.57 8.97-1.67 2.23-3.96 3.59-6.87 4.07-5.59.93-9.4-1.43-11.43-7.07-1.07-2.64-1.85-4.48-2.34-5.52-.49-1.04-1.1-2.06-1.84-3.06s-1.79-2.06-3.16-3.18c-1.36-1.12-3.14-2.39-5.33-3.81-7.9-5.01-13.39-8.6-16.48-10.76s-5.89-4.87-8.42-8.13c-2.52-3.26-4.18-7.27-4.97-12.02-1-6.04-.24-11.91 2.29-17.62 2.53-5.71 6.65-10.57 12.36-14.59 5.71-4.02 12.62-6.71 20.73-8.05 8.72-1.45 16.66-.92 23.79 1.57 7.14 2.5 12.87 6.19 17.18 11.07 4.32 4.89 6.92 9.99 7.8 15.3.44 2.58-.24 5.15-2.03 7.71zm-32.93 89.12c-2.89-1.82-4.66-4.69-5.31-8.6-.58-3.52.13-6.69 2.13-9.49 2.01-2.8 4.77-4.5 8.29-5.08 3.58-.59 6.8.11 9.66 2.11 2.86 2 4.58 4.76 5.17 8.28.66 3.97-.1 7.27-2.28 9.9-2.18 2.63-4.97 4.23-8.39 4.79-3.29.55-6.38-.09-9.27-1.91z"
        className="st4"
        style={{
          enableBackground: "new",
        }}
      />
      <G
        className="st4"
        style={{
          enableBackground: "new",
        }}
      >
        <Path
          d="M223.89 571.56c-1.79 2.57-4.25 4.11-7.38 4.63-5.31.88-9.44-1.68-12.4-7.68-3.02-5.71-6.23-9.87-9.66-12.49-3.42-2.62-8.21-3.42-14.36-2.4-5.26.87-9.29 3.12-12.11 6.75-2.82 3.63-3.86 7.68-3.11 12.15.38 2.29 1.28 4.33 2.69 6.1a24.39 24.39 0 0 0 4.91 4.66c1.86 1.33 4.84 3.26 8.94 5.8 4.68 2.9 8.43 5.46 11.27 7.66s5.27 4.9 7.29 8.1c2.03 3.2 3.43 7.14 4.21 11.84.62 3.75.1 6.74-1.57 8.97-1.67 2.23-3.96 3.59-6.87 4.07-5.59.93-9.4-1.43-11.43-7.07-1.07-2.64-1.85-4.48-2.34-5.52-.49-1.04-1.1-2.06-1.84-3.06s-1.79-2.06-3.16-3.18c-1.36-1.12-3.14-2.39-5.33-3.81-7.9-5.01-13.39-8.6-16.48-10.76s-5.89-4.87-8.42-8.13c-2.52-3.26-4.18-7.27-4.97-12.02-1-6.04-.24-11.91 2.29-17.62 2.53-5.71 6.65-10.57 12.36-14.59s12.62-6.71 20.73-8.05c8.72-1.45 16.66-.92 23.79 1.57 7.14 2.5 12.87 6.19 17.18 11.07 4.32 4.89 6.92 9.99 7.8 15.3.44 2.57-.24 5.14-2.03 7.71zm-32.93 89.12c-2.89-1.82-4.66-4.69-5.31-8.6-.58-3.52.13-6.69 2.13-9.49 2.01-2.8 4.77-4.5 8.29-5.08 3.58-.59 6.8.11 9.66 2.11 2.86 2 4.58 4.76 5.17 8.28.66 3.97-.1 7.27-2.28 9.9-2.18 2.63-4.97 4.23-8.39 4.79-3.29.54-6.38-.09-9.27-1.91z"
          className="st5"
          style={{
            fill: "none",
            stroke: "#000",
            strokeMiterLimit: 10,
          }}
        />
      </G>
      <Ellipse
        cx={561.62}
        cy={666.5}
        rx={212.46}
        ry={58.49}
        style={{
          opacity: 0.72,
          fill: "#fff",
          enableBackground: "new",
        }}
      />
      <Path
        d="M349.01 666.5v-.93c-.06.28-.06.59 0 .93zM653.04 41.9 440.41 192.32l-91.4 474.19s31.03-58.49 212.46-58.49 211.78 57.56 211.78 57.56L653.04 41.9z"
        className="st7"
        style={{
          opacity: 0.49,
          fill: "#fff",
          enableBackground: "new",
        }}
      />
      <Circle
        cx={270.5}
        cy={174.45}
        r={29.1}
        className="st1"
        style={{
          fill: "#e7fd7b",
        }}
      />
      <Circle
        cx={979.93}
        cy={810.68}
        r={29.1}
        className="st1"
        style={{
          fill: "#e7fd7b",
        }}
      />
      <Circle
        cx={374.87}
        cy={935.01}
        r={48.12}
        style={{
          opacity: 0.25,
          fill: "#e7fd7b",
        }}
      />
      <Circle
        cx={230.85}
        cy={724.99}
        r={29.1}
        className="st1"
        style={{
          fill: "#e7fd7b",
        }}
      />
      <Circle
        cx={979.93}
        cy={345.48}
        r={50.6}
        style={{
          fill: "#fff",
        }}
      />
      <Path
        d="M421.96 714.72c-4.45-9.8-11.55-18.02-16.12-27.8-7.95-17-13.72-34.47-16.11-53.21-1.6-12.52-1.75-25.1-.86-37.42 1.66-23.11 7.53-45.48 18.96-65.93 11.4-20.4 25.31-38.9 43.81-53.47 20.29-15.98 42.71-27.68 68.05-33.72 16.83-4.01 33.86-5.64 50.98-4.81 23.35 1.13 45.41 7.27 66.7 17.49 17.98 8.64 33.88 19.68 47.43 33.93 25.29 26.6 41.25 57.9 46.97 94.54 4.26 27.3 2.11 53.98-6.15 79.94-7.32 23.01-19.22 43.76-35.61 61.92-16.42 18.19-35.67 32.66-57.66 42.7-16.49 7.53-34.1 12.88-52.7 13.8-7.85.39-15.68.98-23.56.96-13.07-.04-25.95-1.52-38.52-5.16-19.44-5.62-38.38-12.3-54.31-25.43-1.64-1.36-3.38-2.64-5.67-2.69.01-1.18-.63-1.88-1.57-2.55-9.06-6.48-16.5-14.71-24.35-22.51-3.41-3.39-5.03-8.4-9.71-10.58zm2.63-101.96c-.63 74.71 64.63 136.29 137.96 134.96 39.13-.71 72.57-14.99 99.1-43.76 28-30.35 40.62-67.56 35.94-107.74-7.4-63.53-58.34-122.2-137.92-122.1-75.07.09-136.63 62.75-135.08 138.64z"
        style={{
          fill: "#606060",
        }}
      />
      <Path
        d="M421.96 714.72c4.68 2.19 6.3 7.2 9.71 10.59 7.85 7.8 15.29 16.03 24.35 22.51.94.67 1.58 1.37 1.57 2.55-2.5-.02-3.62 2.03-5.08 3.48-11.92 11.9-23.72 23.92-35.77 35.69-2.56 2.51-2.99 3.88-.1 6.41 4.16 3.64 7.63 8.1 11.87 11.63 4.01 3.35 3.36 5.45-.07 8.86-33.63 33.32-67.09 66.81-100.59 100.26-12.83 12.81-25.72 25.54-38.4 38.49-3.32 3.39-5.24 3.71-9 .04-22.86-22.34-46.06-44.33-69.31-66.58 12.6-12.54 23.44-22.9 33.78-33.74 15.09-15.83 30.83-31.01 46.14-46.63a1394.73 1394.73 0 0 1 34.63-34.15c10.93-10.41 21.47-21.25 31.86-32.22 2.59-2.73 3.72-1.43 5.45.3 4.22 4.23 8.49 8.4 12.63 12.69 2.13 2.2 3.89 2.79 6.35.28 13.26-13.56 26.64-26.99 39.98-40.46z"
        style={{
          fill: "#282828",
        }}
      />
    </Svg>
  );
};

export const EmptyPage = ({ searchValue }) => {
  return (
    <RN.View style={{ marginVertical: 10}}>
      <Empty height={300} />
      <RN.Text
        style={{
          marginTop:30,
          fontSize: sizes.smallFont,
          textAlign: "center",
        }}
      >
        {EMPTY_SEARCH}
      </RN.Text>
      <RN.Text
        style={{
          fontSize: sizes.smallFont,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        "{searchValue}"
      </RN.Text>
    </RN.View>
  );
};
