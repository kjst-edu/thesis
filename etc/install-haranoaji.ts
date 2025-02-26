const command = new Deno.Command("quarto", {
    args: [
      "check"
    ],
  }
);

// deno-lint-ignore no-unused-vars
const { code, stdout, stderr } = await command.output();
const res_check = new TextDecoder().decode(stderr);

const lines = res_check.split("\n");

let latex_line = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("[✓] Checking LaTeX")) {
        latex_line = i;
    }
}

// (undetected)

let [_k, v] = lines[latex_line + 1].split(":")
const val = v.trim();

if (val === "(not detected)") {
    console.log(`LaTeX: ${ val }\n`);
    console.log(
        "Could not find a LaTeX installation. See https://quarto.org/docs/output-formats/pdf-engine.html.\n"
        + "It is recommened that you use TinyTeX. Install it with", "\n\n"
        + "    quarto install tinytex\n"
    );

    Deno.exit(0);
} 

// LaTeX detected
let [_j, path] = lines[latex_line + 2].split(":");
path = path.trim();
console.log(`LaTeX: ${ path }\n`);

if (val === "TinyTex") {

    console.log("Installing haranoaji package...\n\n");

    const install = new Deno.Command(`${ path }/tlmgr`, {
        args: [
          "install",
          "haranoaji"
        ],
      }
    );

    const { code, stdout, stderr } = await install.output();
    const res_install = new TextDecoder().decode(stdout);

    console.log(res_install);
}