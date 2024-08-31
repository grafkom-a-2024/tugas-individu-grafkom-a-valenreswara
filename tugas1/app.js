function main() {
    console.log('yay bisa');

    var canvas = document.querySelector("#kanvas");
    var gl = canvas.getContext('webgl');

    if(!gl){
        console.log('pake experimental')
        gl = canvas.getContext('experimental-webgl');
    }
    if(!gl){
        alert('browser gabisa WebGL');
    }

    gl.clearColor(0.75, 0.85, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Setup program GLSL
    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);

    // cari data letak vertexnya harus kemana
    var positionAttribLocation = gl.getAttribLocation(program, "a_position");

    var positions = [
    //  X  Y
        0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]

    // buat buffer 
    var positionBuffer = gl.createBuffer();

    // bind buffernya ke ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // KODE DI ATAS UNTUK INISIALISASI
    // KODE DI BAWAH UNTUK RENDERING

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.vertexAttribPointer(
        positionAttribLocation, // lokasi atribut
        2, // jumlah elemen (titik) per atribut
        gl.FLOAT, // tipe elemen
        gl.FALSE, // normalisasi data ato engga
        2 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte setiap vertex
        0 // offset mulai titiknya dari awal
    );

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

main();