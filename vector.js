function v_sum (v1, v2) {
	var v3 = Array(v1.length);
	for (var i = 0; i < v1.length; i++) {
		v3[i] = v1[i] + v2[i];
	}
	return v3;
}

function v_sub (v1, v2) {
	var v3 = Array(v1.length);
	for (var i = 0; i < v1.length; i++) {
		v3[i] = v1[i] - v2[i];
	}
	return v3;
}

function v_scalar_mul (v, s) {
	var r = Array(v.length);
	for (var i = 0; i < v.length; i++) {
		r[i] = v[i] * s;
	}
	return r;
}

function v_len (v) {
	var l = 0.0;
	for (var i = 0; i < v.length; i++) {
		l += (v[i] * v[i]);
	}
	if (l < 0) l = -l;
	return Math.sqrt(l);
}

function v_norm (v) {
	var l = v_len(v);
	var r = Array(v.length);
	for (var i = 0; i < v.length; i++) {
		r[i] = v[i] / l;
	}
	return r;
}

function v_eq (v1, v2, delta) {
	for (var i = 0; i < v1.length; i++) {
		if ( v1[i] > v2[i] + delta  || v1[i] < v2[i] - delta ) return false;
	}
	return true;
}

function v_eq_int (v1, v2) {
	for (var i = 0; i < v1.length; i++) {
		if (Math.round(v1[i]) != Math.round(v2[i])) return false;
	}
	return true;
}

function v_eq_int (v1, v2, delta) {
	for (var i = 0; i < v1.length; i++) {
		if ( Math.round(v1[i]) > Math.round(v2[i] + delta)  || Math.round(v1[i]) < Math.round(v2[i] - delta) ) return false;
	}
	return true;
}
