const turndownService = require('turndown');
const fs = require("fs");
const path = require("path");

const parseFiles = () => {
	var parseService = new turndownService();
	const files = fs.readdirSync(path.resolve(__dirname, "a1"), { encoding: "utf-8" });
	for (const file of files) {
		if (path.extname(file) == ".html") {
			const content = fs.readFileSync(path.resolve(__dirname, "a1", file), { encoding: "utf-8" });
			const markdown = parseService.turndown(content);
			const name = file.split(".")[0];
			fs.writeFileSync(path.resolve(__dirname, "markdown", `${name}.md`), markdown);
		}
	}

}

parseFiles()