const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

const vertexShaderSource = `#version 300 es
    
    void main()
    {
       gl_Position=vec4(0.5, 0.5, 0.0, 1.0);
       gl_PointSize=150.0;
    }
`;

const fragmentShaderSource = `#version 300 es

    precision mediump float;
    out vec4 fragColor;

    void main()
    {
       fragColor=vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

const programm = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(programm, vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(programm, fragmentShader);

gl.linkProgram(programm);

if (!gl.getProgramParameter(programm, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}

gl.useProgram(programm);

gl.drawArrays(gl.POINTS, 0, 1);