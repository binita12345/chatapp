var RutValidator = /** @class */ (function () {
    function RutValidator() {
    }
    RutValidator.isValid = function (control) {
        var re = /^([0-9]{7,8})-([a-zA-Z0-9_\-\.]{1})$/.test(control.value);
        if (re) {
            return null;
        }
        return {
            "invalidRut": true
        };
    };
    return RutValidator;
}());
export { RutValidator };
//# sourceMappingURL=rut.js.map