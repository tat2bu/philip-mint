import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

const ABI = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"contractAddr","type":"address"},{"internalType":"address","name":"treasuryWalletAddr","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"destination","type":"address"}],"name":"PhilipMinted","type":"event"},{"inputs":[],"name":"getRandomPhunks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"root","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const merkleTree = {"format":"standard-v1","tree":["0xa9b170e2aaa61cc4dab50771bd7bd8c69c4358e9ee216571a64ff1a36708ca52","0xe642c85c823de95fd064b5f23afe89f66e51ed7ac03bae61341bce34e8027df1","0x0755311192af272ae8b8585a9e90fecb919abc05496bf44bc34c5883652f9175"],"values":[{"value":["0x35bfDe9cb65A010954B056c7Df26339539d5c3da"],"treeIndex":2},{"value":["0x516Fc698fb46506aA983a14F40b30c908d86Dc82"],"treeIndex":1}],"leafEncoding":["address"]}
const contractAddress = '0x55292579394EFa031d6bd425a43c53f93FDd06d9'

function getRandomPhunk() {
    const id = Math.floor(Math.random()*10000).toString().padStart(4, '0')
    const url = `./original_punks_images/punk${id}.png`
    return url
}
let running = false
let unlimited = true

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

let duration = 80, decay = 1.1
let ticks = 8*3+Math.floor(Math.random()*8)
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
            }
            if (!unlimited) ticks--
            if (ticks > 0) {
                const newDuration = unlimited ? duration : duration*decay
                animateFrameTo(phunkOffset, newDuration)
            }
        })
    })
}

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
    getRandomPhunk(),
    getRandomPhunk(),
    getRandomPhunk(),
    getRandomPhunk(),
    getRandomPhunk(),
    getRandomPhunk(),
    getRandomPhunk(),
    getRandomPhunk()
]
preload(phunks)

window.onload = () => { 
    for (let i = 0; i < 8; i++) {
        const id = `#phunk${i+1}`
        $(id).data("phunk", phunks[i])
        $(id).addClass("flipped") // .css("background-image", `url(${phunks[i]})`)
    }
    setTimeout(() => {
        $(".images li").each((index, item) => {
            setTimeout(() => {
                $(item).removeClass("flipped").css("background-image", `url('philip.png')`)
            }, index*150)
        })
        setTimeout(() => $(".start").css("visibility", "visible"), 1200)
    }, 1400)

    setInterval(() => { 
        if (!running) return
        const position = $(".frame-background").position()
        // console.log(Math.floor(position.top))
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
            // console.log(position, id)
        }
    }, 1000/25)

    window.ethereum.on("networkChanged", (network) => {
        window.reload()
    })

    $(".start").click(async () => {
        $(".start").hide()
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account = await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const chain = await provider.getNetwork();
        console.log(account, chain)

        const tree = StandardMerkleTree.load(merkleTree);
        let proof = null;
        for (const [i, v] of tree.entries()) {
            // console.log(i,v,account[0],v===account[0])
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
                .filter(l => l.topics[0] === "0x50fb101533eb9f1824ee42912a609d8018ead3eb152dcb5ae2ee31b0c2c28815")[0]
                .topics[1]
            console.log('minted', phunkId)
            unlimited = false

            // receipt logs 0x50fb101533eb9f1824ee42912a609d8018ead3eb152dcb5ae2ee31b0c2c28815 then index 1
        } catch (err) {
            alert(err.error.message)
            console.error(err)
            $(".start").css("visibility", "visible").show()
            running = false
            $("body").removeClass("running")
        }
    })
}