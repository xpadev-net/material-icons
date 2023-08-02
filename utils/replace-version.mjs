import * as fs from "fs"
import pkg from "../package.json" assert {type: "json"}

const processDir = (dir = "./dist") => {
  const files = fs.readdirSync(dir);
  for (const item of files) {
    const path = `${dir}/${item}`;
    if (fs.lstatSync(`${path}`).isDirectory()) {
      processDir(`${path}/` );
    } else if (item === "package.json") {
      const content  = fs.readFileSync(path,"utf-8").replace(/\[version]/gi,pkg.version);
      console.log(content)
      fs.writeFileSync(path,content)
    }
  }
};

processDir();
