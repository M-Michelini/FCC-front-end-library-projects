window.AudioContext = window.AudioContext || window.webkitAudioContext;

function AudioComponent(audioRefs) {
  this.context = new AudioContext();
  this.buffers = audioRefs.reduce((acc,ref)=>{
    acc[ref.label]=ref.url;
    return acc;
  },{});
}
AudioComponent.prototype.play = function(ref){
  var source = this.context.createBufferSource();
  var gainNode = this.context.createGain();       // creates a sound source
  source.buffer = this.buffers[ref];                    // tell the source which sound to play
  source.connect(gainNode);                  // connect the source to the context's destination (the speakers)
  gainNode.connect(this.context.destination);
  source.start();
}

AudioComponent.prototype.loadAudioFiles = function(done){
  Promise.all(
    Object.keys(this.buffers).map(audioref=>
      fetch(this.buffers[audioref])
        .then(res=>res.arrayBuffer())
        .then(buffer=>this.context.decodeAudioData(buffer))
        .then(buffer=>this.buffers[audioref] = buffer)
    )
  )
  .then((buffers)=>{
    console.log(this.buffers)
  }).then(done)
}

module.exports = AudioComponent;
