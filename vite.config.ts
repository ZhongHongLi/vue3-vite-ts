import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const fs = require("fs")
const dotenv = require("dotenv")
import { resolve } from "path";  //编辑器提示 path 模块找不到，可以yarn add @types/node --dev
import viteCompression from "vite-plugin-compression";

export default({command, mode})=>{
  let NODE_ENV =  process.env.NODE_ENV || 'development';
	let envFiles = [];
	//根据不同的环境使用不同的环境变量
	if(command == 'serve'){
		envFiles = [
			/** default file */
			`.env`
		]
	}else{
		envFiles = [
			/** default file */
			`.env`,
			/** mode file */
			`.env.${NODE_ENV}`
		]
	}
	for (const file of envFiles) {
		const envConfig = dotenv.parse(fs.readFileSync(file))
		for (const k in envConfig) {
			process.env[k] = envConfig[k]
		}
	}
 return defineConfig({
      plugins: [
        vue(),
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        }),
      ],
      resolve: {
        alias: {
          "@": resolve("./src"),
        },
      },
      base: "./",
      server: {
        port: 4000,
        open: true,
        cors: true,
        proxy:{
          '/api':{
            target:'https://node-wanyi.vercel.app/',
            changeOrigin:true,
            rewrite:(path) => path.replace(/^\/api/,'')
          }
        }
      },
    });
}


// export default 
