// vite.config.mjs
import Components from "file:///D:/Front/reserve.utsa/node_modules/unplugin-vue-components/dist/vite.js";
import Vue from "file:///D:/Front/reserve.utsa/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Vuetify, { transformAssetUrls } from "file:///D:/Front/reserve.utsa/node_modules/vite-plugin-vuetify/dist/index.mjs";
import ViteFonts from "file:///D:/Front/reserve.utsa/node_modules/unplugin-fonts/dist/vite.mjs";
import VueRouter from "file:///D:/Front/reserve.utsa/node_modules/unplugin-vue-router/dist/vite.mjs";
import { defineConfig } from "file:///D:/Front/reserve.utsa/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///D:/Front/reserve.utsa/vite.config.mjs";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter(),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss"
      }
    }),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900"
          }
        ]
      }
    })
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  server: {
    port: 80
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcRnJvbnRcXFxccmVzZXJ2ZS51dHNhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxGcm9udFxcXFxyZXNlcnZlLnV0c2FcXFxcdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Gcm9udC9yZXNlcnZlLnV0c2Evdml0ZS5jb25maWcubWpzXCI7Ly8gUGx1Z2luc1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xyXG5pbXBvcnQgVnVldGlmeSwgeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5JztcclxuaW1wb3J0IFZpdGVGb250cyBmcm9tICd1bnBsdWdpbi1mb250cy92aXRlJztcclxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnO1xyXG5cclxuLy8gVXRpbGl0aWVzXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIFZ1ZVJvdXRlcigpLFxyXG4gICAgVnVlKHtcclxuICAgICAgdGVtcGxhdGU6IHsgdHJhbnNmb3JtQXNzZXRVcmxzIH1cclxuICAgIH0pLFxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZXRpZnlqcy92dWV0aWZ5LWxvYWRlci90cmVlL21hc3Rlci9wYWNrYWdlcy92aXRlLXBsdWdpbiNyZWFkbWVcclxuICAgIFZ1ZXRpZnkoe1xyXG4gICAgICBhdXRvSW1wb3J0OiB0cnVlLFxyXG4gICAgICBzdHlsZXM6IHtcclxuICAgICAgICBjb25maWdGaWxlOiAnc3JjL3N0eWxlcy9zZXR0aW5ncy5zY3NzJ1xyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoKSxcclxuICAgIFZpdGVGb250cyh7XHJcbiAgICAgIGdvb2dsZToge1xyXG4gICAgICAgIGZhbWlsaWVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdSb2JvdG8nLFxyXG4gICAgICAgICAgICBzdHlsZXM6ICd3Z2h0QDEwMDszMDA7NDAwOzUwMDs3MDA7OTAwJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIGRlZmluZTogeyAncHJvY2Vzcy5lbnYnOiB7fSB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9LFxyXG4gICAgZXh0ZW5zaW9uczogWycuanMnLCAnLmpzb24nLCAnLmpzeCcsICcubWpzJywgJy50cycsICcudHN4JywgJy52dWUnXVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA4MFxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXLDBCQUEwQjtBQUM1QyxPQUFPLGVBQWU7QUFDdEIsT0FBTyxlQUFlO0FBR3RCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZSxXQUFXO0FBVHFILElBQU0sMkNBQTJDO0FBWXpNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLElBQUk7QUFBQSxNQUNGLFVBQVUsRUFBRSxtQkFBbUI7QUFBQSxJQUNqQyxDQUFDO0FBQUE7QUFBQSxJQUVELFFBQVE7QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxRQUNOLFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUEsVUFDUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sUUFBUTtBQUFBLFVBQ1Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVEsRUFBRSxlQUFlLENBQUMsRUFBRTtBQUFBLEVBQzVCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFNBQVMsUUFBUSxRQUFRLE9BQU8sUUFBUSxNQUFNO0FBQUEsRUFDcEU7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
