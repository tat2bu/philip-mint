import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
const wallets = [
  "0x45d6d9f604013b4f7442341b81a77fe4c391444f",
  "0xcc3b37eeb73143e6d2a547058118fe25561a4eb2",
  "0x34400ecc4a5a69891a617a073e2935189f771958",
  "0xaf583cfc0dd22bbaa9f3751db27509d497fa0c7a",
  "0xf45cb82cf57390868feedf42a20ced61576a5a75",
  "0xed8675eae36c0eff4163720019e40b2574ec6bd4",
  "0x66bdc08a0db3a83d374670a57aa8ecd5b51b55e5",
  "0x1aa8fb4363fe0d3a0fc6decedcb083b79cde47c6",
  "0x4b2b53ab8417452d77493c5e78bb6140d3951018",
  "0xf02daccf7db3b7977d4902a3d9f2dcc4be04d8aa",
  "0x0dcf7d7a78e19ac9d2cf1955259a2c733b09b7ec",
  "0x322b9a4f95c8920eed3bd8338dedd0b309deb248",
  "0x2f67a952b952593848d597102298acf9253b841b",
  "0x8eb9c82469b52d2ace63b20ee04ad4d295921374",
  "0xf42bea3d14951a476a7c58ca38524c408142c269",
  "0xb396fca2d58421c550ce24ef4ecc2029233e0b31",
  "0x568333b0c53805891ceef81ea05de933bcf0acea",
  "0x3860e090239d0dba44f2b8cb37adc81b0528a96f",
  "0x304018f69c2e3ad9564f52ac8acdddc28cf39dca",
  "0x646747692bc27f5c443e3bea5cf48e56f7909c94",
  "0xfcdd460a15aad5bc32a7ceabb0df9cab1ac7dce4",
  "0x909d6a812a8b283bdd18be705c149a8861d4f401",
  "0x902d7392990060112438afec0d604dc4987d8a4c",
  "0xd88f08d57189bc1f1498d6851d45b9eca432ba26",
  "0xb04a0314abc2f6fb3a734d29e9d6b7668e171e8a",
  "0xf7b6409b12a540947688f054dbf5b629fb3fc7d8",
  "0x78d3aaf8e3cd4b350635c79b7021bd76144c582c",
  "0xe8c7d4d0c76f7363806d847f8059e493286bc88a"
]
/*
const values = [
  ["0x35bfDe9cb65A010954B056c7Df26339539d5c3da"],
  ["0xf42bEA3D14951a476A7c58ca38524C408142c269"],
  ["0xFfaD5D78dd52eB9538998472A22506BdEA0632C3"],
  ["0x516Fc698fb46506aA983a14F40b30c908d86Dc82"]
];
*/
const values = wallets.map((wallet) => [wallet]);

// (2)
const tree = StandardMerkleTree.of(values, ["address"]);

// (3)
console.log('Merkle Root:', tree.root);

// (4)
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
