// Run `quarto check` to find latex installation
//   and then run `tlmgr install haranoaji`

const quarto_check = new Deno.Command("quarto", {
  args: ["check"],
});

// deno-lint-ignore no-unused-vars
const { code, stdout, stderr } = await quarto_check.output();
const res_check = new TextDecoder().decode(stderr);

const lines = res_check.split("\n");
let latex_line = -1;
let regex = new RegExp("\\[.\\] Checking LaTeX.*", "i");

for (let i = 0; i < lines.length; i++) {
  let match = regex.test(lines[i]);
  if (match) {
    latex_line = i;
  }
}

// (undetected)

let [_k, v] = lines[latex_line + 1].split(":", 2);
const val = v.trim();

if (val === "(not detected)") {
  console.log(`LaTeX: ${val}\n`);
  console.log(
    "Could not find a LaTeX installation. See https://quarto.org/docs/output-formats/pdf-engine.html.\n" +
      "It is recommened that you use TinyTeX. Install it with",
    "\n\n" + "    quarto install tinytex\n"
  );

  Deno.exit(0);
}

// LaTeX detected
let latex_path: string[] = lines[latex_line + 2].split(":");

// Path to latex
let path, path_sep, cmd: string;

if (latex_path.length > 2) {
  // windows
  path = latex_path
    .slice(1, 3)
    .map((e) => e.trim())
    .join(":");
  path_sep = "";
  cmd = "tlmgr.bat";
} else {
  // linux
  path = latex_path[1].trim();
  path_sep = "/";
  cmd = "tlmgr";
}

console.log(`LaTeX: ${path}\n`);

if (val === "TinyTex") {
  console.log("Installing haranoaji package...\n\n");

  const install = new Deno.Command(`${path}${path_sep}${cmd}`, {
    args: ["install", "haranoaji"],
  });

  const { code, stdout, stderr } = await install.output();
  const res_install = new TextDecoder().decode(stdout);

  console.log(res_install);
}
