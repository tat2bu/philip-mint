import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

const ABI = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"contractAddr","type":"address"},{"internalType":"address","name":"treasuryWalletAddr","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"destination","type":"address"}],"name":"PhilipMinted","type":"event"},{"inputs":[],"name":"getRandomPhunks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"root","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const merkleTree = {"format":"standard-v1","tree":["0xd8d277aef92411a72d50fd98822f515ea57b2394d166cc2762a086ad9795a2d9","0xd515c3ba13947bea69ef59d72bacb2e49a6e34c2b0fb98c0dd13656b82a0ae9e","0xe642c85c823de95fd064b5f23afe89f66e51ed7ac03bae61341bce34e8027df1","0x8a23ac363c6a9c7e43cfbc159c2ad8ebcafce3d5f46967c91ce5023c486e7dac","0x0755311192af272ae8b8585a9e90fecb919abc05496bf44bc34c5883652f9175"],"values":[{"value":["0x35bfDe9cb65A010954B056c7Df26339539d5c3da"],"treeIndex":4},{"value":["0xf42bEA3D14951a476A7c58ca38524C408142c269"],"treeIndex":3},{"value":["0x516Fc698fb46506aA983a14F40b30c908d86Dc82"],"treeIndex":2}],"leafEncoding":["address"]}
const contractAddress = '0x0a6B719524ff80c01bC4804e32b4F6497CB0aac3'

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
    })
}