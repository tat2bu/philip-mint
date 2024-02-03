import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

const values = [
  ["0x35bfDe9cb65A010954B056c7Df26339539d5c3da"],
  ["0xf42bEA3D14951a476A7c58ca38524C408142c269"],
  ["0x516Fc698fb46506aA983a14F40b30c908d86Dc82"]
];

// (2)
const tree = StandardMerkleTree.of(values, ["address"]);

// (3)
console.log('Merkle Root:', tree.root);

// (4)
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
