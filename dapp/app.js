import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

const ABI = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"contractAddr","type":"address"},{"internalType":"address","name":"treasuryWalletAddr","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"destination","type":"address"}],"name":"PhilipMinted","type":"event"},{"inputs":[],"name":"getRandomPhunks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"root","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const merkleTree = {
    "format": "standard-v1",
    "tree": [
      "0xdff83f142f6befc3e1de0df17888f0d81f74001da735d42b90041482f55180a8",
      "0x3c491fc2828afed385cbcc4ef224f455655bd43140380d63a45dae0d02d61871",
      "0xf06a2d0b67062d07885e65b957714920d4e85846c29a0f51bfd23352e31dac0a",
      "0x138eb3eac2152d14980a1fed5df10ad4c49b958c2865b3c801594b1c62c79e1e",
      "0x61f941fb2e4b2d7d73ae898df5fa0f28a40a8ac66aa1007a7f94efef4bf75f3a",
      "0x9ab8e9c667040567c3848961beccdaa777164f7bf24f54a0cb99f8ed190d6666",
      "0xcf631f8ea99d2d4fd14160ca042a99218cfe639b8cbf8013fc66f0968fa7af37",
      "0x4ad8aa74bb460c7f92b87d3adc17a75e4cae5c8c2b468b7e30fc250459b8b40d",
      "0x1dc4ba5fab9204920dcbc3b39fc0c82a927471f237c2c6d2e767e5bcb09efb33",
      "0x08b43e88c2af2a6f348cf1ced84941f1215c68c451e5f74953ce3140f83a0094",
      "0x91f08309bfd174a61b555b8eafeeff702f7e1453f277c3301bc8c2ae50a885da",
      "0x57d67f63112902a04a8f02d49098b2bd452a1327cc86e8f1b9df12fd041a8770",
      "0xfac6cc8bf463c12da19228eefb293a25255bebc62045b1f5f055c6e17df2a009",
      "0xe8561dda745466d76a3e07be551b0300800223802bb75037e619046e618e896d",
      "0xc6192f3bc452d6063c1c8395b7ba0d00c6e308e8d10e38ee110b2d4d55d86842",
      "0x75fc2ca9415a8df2befba64f113ab9e2c80c14fb279fbceffb93677a4f266255",
      "0x7533a7a30ed38b47c52329883e3b01cf1700aa682394e6d830eee51d8a78605d",
      "0x73ad5f55e2c63cd7e78650395c249bd9400f7038eac6837fdb348239670ac198",
      "0x6b862afcdf96199a873cd05f4b276fa98b8bece69def12d7d2e0b9ef64671449",
      "0x597ac419d75c8bcbe9bb5fbd6b1f2e905ba050bc109832469a4818b46567b2f0",
      "0x502b9b85d1d4a8600f5bde7e6c4d9544d1c6e304f37dab6f7e6064b13000a2eb",
      "0x39549ceff792a24128339c47b929f0a6da6e0f0d6cb1542f6a84ce68d2729dd5",
      "0x1d2f97f2c9f7779d49df78734cd63896a9874790c14e477b0a6a4a4ef09768ca",
      "0x101ead93f10a289367a1662c6fe5d27e32dafdb067b9f177af85a2a3ff059d91",
      "0x0314a9cbec1ec370abb35e3b1bbf2aef3ae1af6a3d5246575ef31fd0a69549a8"
    ],
    "values": [
      {
        "value": [
          "0xf1aa941d56041d47a9a18e99609a047707fe96c7"
        ],
        "treeIndex": 24
      },
      {
        "value": [
          "0x0659246fc6b9d0a0465da837865eff256b624fbc"
        ],
        "treeIndex": 13
      },
      {
        "value": [
          "0xd2e898bfbdb0dadee09d966920282d70ef7cc55b"
        ],
        "treeIndex": 16
      },
      {
        "value": [
          "0x8eb9c82469b52d2ace63b20ee04ad4d295921374"
        ],
        "treeIndex": 23
      },
      {
        "value": [
          "0x2a878245b52a2d46cb4327541cbc96e403a84791"
        ],
        "treeIndex": 12
      },
      {
        "value": [
          "0xf0c1d8c00190d7acefd6340d65fc5c8189315e61"
        ],
        "treeIndex": 21
      },
      {
        "value": [
          "0xfdc2b224cc1fd65d6cdccdd896510a7d89af81c3"
        ],
        "treeIndex": 19
      },
      {
        "value": [
          "0x646747692bc27f5c443e3bea5cf48e56f7909c94"
        ],
        "treeIndex": 14
      },
      {
        "value": [
          "0xa18f4bad16c6756649fa3172a7de94d2b0d665d7"
        ],
        "treeIndex": 20
      },
      {
        "value": [
          "0x802f0eb7792871b67fc21d4faeeed9cd680d2fdd"
        ],
        "treeIndex": 15
      },
      {
        "value": [
          "0x0d869a936f7faf615e584dba700951b5972d5fb3"
        ],
        "treeIndex": 22
      },
      {
        "value": [
          "0xd88f08d57189bc1f1498d6851d45b9eca432ba26"
        ],
        "treeIndex": 18
      },
      {
        "value": [
          "0x8eec357d3816e04986c1c73edfc82f9988c7da6a"
        ],
        "treeIndex": 17
      }
    ],
    "leafEncoding": [
      "address"
    ]
  }
const contractAddress = '0x7BB93915Bc524BcF1DdFbD0ccfe6Fbda2dEac782'

function getRandomPhunkURL() {
    const id = Math.floor(Math.random()*10000).toString()
    return getPhunkURL(id)
}
function getPhunkURL(id) {
    const url = `./original_punks_images/punk${id.padStart(4, '0')}.png`
    return url
}
let running = false
let unlimited = true
let stopUnlimitedRequested = false

const phunkToFrame = [
    [15, 55],
    [15, 225],
    [15, 405],
    [15, 580],
    [170, 580],
    [170, 405],
    [170, 225],
    [170, 55],
]
const urlParams = new URLSearchParams(window.location.search);
const demo = urlParams.get('demo') === 'true';
if (demo) {
    alert('demo mode activated')
}

let duration = 180, decay = 1.1
let random = Math.floor(Math.random()*8)
let ticks = 8*2+random+2 // the 2 is needed to get the random part to start from 0 after some turns

function animateFrameTo(phunkOffset, duration) {
    const id = `#phunk${phunkOffset+1}`
    // console.log('animateFrameTo', id, duration)
    const x = phunkToFrame[phunkOffset][0]
    const y = phunkToFrame[phunkOffset][1]

    $(".frame").each((_, elem) => {
                        
        $(elem).animate({
            top: `${x}px`,
            left: `${y}px`
        }, duration, () => {
            if (!elem.classList.contains("frame-inner")) return

            phunkOffset++
            if (phunkOffset > 7) {
                phunkOffset = 0
                if (stopUnlimitedRequested) {
                    unlimited = false
                    stopUnlimitedRequested = false
                }
            }
            if (!unlimited) ticks--
            if (ticks > 0) {
                const newDuration = unlimited ? duration : duration*decay
                animateFrameTo(phunkOffset, newDuration)
            } else {
                const container = document.querySelector('.firework')
                const fireworks = new Fireworks.default(container)
                fireworks.start()
            }
        })
    })
}

window.animateFrameTo = animateFrameTo

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

function startFrameAnimation() {
    running = true
    $("body").addClass("running")
    $(".frame").addClass("shown")
    setTimeout(() => {
        animateFrameTo(0, duration)
    }, 700)
}

const phunks = [
    getRandomPhunkURL(),
    getRandomPhunkURL(),
    getRandomPhunkURL(),
    getRandomPhunkURL(),
    getRandomPhunkURL(),
    getRandomPhunkURL(),
    getRandomPhunkURL(),
    getRandomPhunkURL()
]
preload(phunks)

window.onload = () => { 

    for (let i = 0; i < 8; i++) {
        const id = `#phunk${i+1}`
        $(id).data("phunk", phunks[i]).attr(`data-phunk`, phunks[i])
        $(id).addClass("flipped")
    }
    setTimeout(() => {
        $(".container").addClass("shown")
    }, 300)
    setTimeout(() => {
        $(".images li").each((index, item) => {
            setTimeout(() => {
                $(item).removeClass("flipped").removeClass("hidden").css("background-image", `url('philip.png')`)
            }, index*150 + 100)
        })
        setTimeout(() => $(".start").addClass("shown"), 1400)
    }, 1200)

    setInterval(() => { 
        if (!running) return
        const position = $(".frame-background").position()
        let x = null;
        if (position.top === 25) {
            if (position.left <= 165)  x = 1;
            else if (position.left <= 325) x = 2;
            else if (position.left <= 520) x = 3;
            else x = 4;
        } else if (position.top > 150) {
            if (position.left >= 480)  x = 8;
            else if (position.left >= 265) x = 7;
            else if (position.left >= 125) x = 6;
            else x = 5;
        }
        if (x) {
            const id = `#phunk${x}`
            $(".images li").removeClass("flipped").css("background-image", `url('philip.png')`)
            $(id).addClass("flipped")
            if (!unlimited) $(id).css("background-image", `url(${$(id).data("phunk")})`)
        }
    }, 1000/25)

    window.ethereum.on("networkChanged", (network) => {
        window.reload()
    })

    $(".start").click(async () => {
        if ($(".start").hasClass("disabled")) {
            return
        }
        $(".start").addClass("disabled")

        if (!demo) {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const account = await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            const chain = await provider.getNetwork();
            console.log(account, chain)
    
            const tree = StandardMerkleTree.load(merkleTree);
            let proof = null;
            for (const [i, v] of tree.entries()) {
                if (v[0].toLowerCase() === account[0].toLowerCase()) {
                  proof = tree.getProof(i);
                }
            }
            
            if (!proof) {
                alert(`Wallet ${account[0]} isn't eligible to mint!`)
                return
            }            
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            try {
                const transaction = await contract.mint(proof);
                startFrameAnimation()            
                await transaction.wait();
                console.log(transaction)
                const receipt = await provider.getTransactionReceipt(transaction.hash);
                console.log(receipt)
                const phunkId = receipt.logs
                    .filter(l => l.topics[0] === "0x32dd7bdf9af0f300b46e907e075f2e53cb0f34041d6b036427c56d3949829c73")[0]
                    .topics[1]
                const phunkIdInt = parseInt(phunkId.substring(2), 16)
                stopUnlimitedRequested = true
                // because the numbering is in the other way around for the bottom line
                const id = random === 4 ? `#phunk8` :
                    random === 5 ? `#phunk7` :
                    random === 6 ? `#phunk6` :
                    random === 7 ? `#phunk5` :
                    `#phunk${random+1}`
                const url = getPhunkURL(phunkIdInt.toString())
                console.log('minted', id, phunkId, phunkIdInt, 'random', random, 'ticks', 'ticks')
                $(id).data("phunk", url).attr(`data-phunk`, url)
            } catch (err) {
                if (err.error && err.error.hasOwnProperty('message')) {
                    alert(err.error.message)
                }
                console.error(err)
                $(".start").removeClass("disabled")
                running = false
                $("body").removeClass("running")
            }
        } else {
            startFrameAnimation()
            setTimeout(() => {
                stopUnlimitedRequested = true
            }, 8000)
        }
    })
}