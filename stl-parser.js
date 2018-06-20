// Credits to: https://github.com/tonylukasavage/jsstl
// This is a modified version to return the STL data renderer-agnostic.

function trim (str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}
// Notes:
// - STL file format: http://en.wikipedia.org/wiki/STL_(file_format)
// - 80 byte unused header
// - All binary STLs are assumed to be little endian, as per wiki doc
var parseStlBinary = function(stl) {
    var geo = {faces: [], vertices: []};
    var dv = new DataView(stl, 80); // 80 == unused header
    var isLittleEndian = true;
    var triangles = dv.getUint32(0, isLittleEndian); 
    // console.log('arraybuffer length:  ' + stl.byteLength);
    // console.log('number of triangles: ' + triangles);
    var offset = 4;
    for (var i = 0; i < triangles; i++) {
        // Get the normal for this triangle
        var normal = [
            dv.getFloat32(offset, isLittleEndian),
            dv.getFloat32(offset+4, isLittleEndian),
            dv.getFloat32(offset+8, isLittleEndian)
        ];
        offset += 12;
        // Get all 3 vertices for this triangle
        for (var j = 0; j < 3; j++) {
            geo.vertices.push(
                [
                    dv.getFloat32(offset, isLittleEndian),
                    dv.getFloat32(offset+4, isLittleEndian),
                    dv.getFloat32(offset+8, isLittleEndian)
                ]
            );
            offset += 12
        }
        // there's also a Uint16 "attribute byte count" that we
        // don't need, it should always be zero.
        offset += 2;   
        // Create a new face for from the vertices and the normal             
        geo.faces.push([i*3, i*3+1, i*3+2, normal]);
    }

    stl = null;
    return geo;
};  

var parseStl = function(stl) {
    var state = '';
    var lines = stl.split('\n');
    var geo = {faces: [], vertices: []};
    var name, parts, line, normal, done, vertices = [];
    var vCount = 0;
    stl = null;
    for (var len = lines.length, i = 0; i < len; i++) {
        if (done) {
            break;
        }
        line = trim(lines[i]);
        parts = line.split(' ');
        switch (state) {
            case '':
                if (parts[0] !== 'solid') {
                    console.error(line);
                    console.error('Invalid state "' + parts[0] + '", should be "solid"');
                    return;
                } else {
                    name = parts[1];
                    state = 'solid';
                }
                break;
            case 'solid':
                if (parts[0] !== 'facet' || parts[1] !== 'normal') {
                    console.error(line);
                    console.error('Invalid state "' + parts[0] + '", should be "facet normal"');
                    return;
                } else {
                    normal = [
                        parseFloat(parts[2]), 
                        parseFloat(parts[3]), 
                        parseFloat(parts[4])
                    ];
                    state = 'facet normal';
                }
                break;
            case 'facet normal':
                if (parts[0] !== 'outer' || parts[1] !== 'loop') {
                    console.error(line);
                    console.error('Invalid state "' + parts[0] + '", should be "outer loop"');
                    return;
                } else {
                    state = 'vertex';
                }
                break;
            case 'vertex': 
                if (parts[0] === 'vertex') {
                    geo.vertices.push([
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    ]);
                } else if (parts[0] === 'endloop') {
                    geo.faces.push( [ vCount*3, vCount*3+1, vCount*3+2, [normal[0], normal[1], normal[2]] ] );
                    vCount++;
                    state = 'endloop';
                } else {
                    console.error(line);
                    console.error('Invalid state "' + parts[0] + '", should be "vertex" or "endloop"');
                    return;
                }
                break;
            case 'endloop':
                if (parts[0] !== 'endfacet') {
                    console.error(line);
                    console.error('Invalid state "' + parts[0] + '", should be "endfacet"');
                    return;
                } else {
                    state = 'endfacet';
                }
                break;
            case 'endfacet':
                if (parts[0] === 'endsolid') {
                    return geo;
                } else if (parts[0] === 'facet' && parts[1] === 'normal') {
                    normal = [
                        parseFloat(parts[2]), 
                        parseFloat(parts[3]), 
                        parseFloat(parts[4])
                    ];
                    if (vCount % 1000 === 0) {
                        console.log(normal);
                    }
                    state = 'facet normal';
                } else {
                    console.error(line);
                    console.error('Invalid state "' + parts[0] + '", should be "endsolid" or "facet normal"');
                    return;
                }
                break;
            default:
                console.error('Invalid state "' + state + '"');
                break;
        }
    }
};

var geo2mesh = function(geo) {
    var mesh = new Mesh();
    for(var i=0; i < geo.vertices.length; i++) {
        var vertex = geo.vertices[i];
        mesh.vertices.push(new Vec3(vertex[0], vertex[1], vertex[2]));
    }
    for(var i=0; i < geo.faces.length; i++) {
        var face = geo.faces[i];
        mesh.faces.push(new Face([face[0], face[1], face[2]], new Vec3(100, 100, 100)));
        mesh.edges.push(new Edge(face[0], face[1]));
        mesh.edges.push(new Edge(face[1], face[2]));
        mesh.edges.push(new Edge(face[2], face[0]));
    }
    return mesh;
};