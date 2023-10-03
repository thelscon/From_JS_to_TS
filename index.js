var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Direction__name, _Level__name, _Level__program, _Group__students;
var School = /** @class */ (function () {
    function School() {
        this.directions = [];
    }
    School.prototype.addDirection = function (direction) {
        this.directions.push(direction);
    };
    return School;
}());
var Direction = /** @class */ (function () {
    function Direction(name) {
        _Direction__name.set(this, void 0);
        this.levels = [];
        __classPrivateFieldSet(this, _Direction__name, name, "f");
    }
    Object.defineProperty(Direction.prototype, "name", {
        get: function () {
            return __classPrivateFieldGet(this, _Direction__name, "f");
        },
        enumerable: false,
        configurable: true
    });
    Direction.prototype.addLevel = function (level) {
        this.levels.push(level);
    };
    return Direction;
}());
_Direction__name = new WeakMap();
var Level = /** @class */ (function () {
    function Level(name, program) {
        _Level__name.set(this, void 0);
        _Level__program.set(this, void 0);
        this.groups = [];
        __classPrivateFieldSet(this, _Level__name, name, "f");
        __classPrivateFieldSet(this, _Level__program, program, "f");
    }
    Object.defineProperty(Level.prototype, "name", {
        get: function () {
            return __classPrivateFieldGet(this, _Level__name, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "program", {
        get: function () {
            return __classPrivateFieldGet(this, _Level__program, "f");
        },
        enumerable: false,
        configurable: true
    });
    Level.prototype.addGroup = function (group) {
        this.groups.push(group);
    };
    return Level;
}());
_Level__name = new WeakMap(), _Level__program = new WeakMap();
var ArrayOf = /** @class */ (function (_super) {
    __extends(ArrayOf, _super);
    function ArrayOf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayOf.prototype.toSorted = function (predicate) {
        return this.sort(predicate);
    };
    return ArrayOf;
}(Array));
var Group = /** @class */ (function () {
    function Group(directionName, levelName) {
        _Group__students.set(this, new ArrayOf);
        this.directionName = directionName;
        this.levelName = levelName;
    }
    Object.defineProperty(Group.prototype, "students", {
        get: function () {
            return __classPrivateFieldGet(this, _Group__students, "f");
        },
        enumerable: false,
        configurable: true
    });
    Group.prototype.addStudent = function (student) {
        __classPrivateFieldGet(this, _Group__students, "f").push(student);
    };
    Group.prototype.showPerformance = function () {
        var sortedStudents = this.students.toSorted(function (a, b) { return b.getPerformanceRating() - a.getPerformanceRating(); });
        return sortedStudents;
    };
    return Group;
}());
_Group__students = new WeakMap();
var Student = /** @class */ (function () {
    function Student(firstName, lastName, birthYear) {
        this.grades = {};
        this.attendance = [];
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
    }
    Object.defineProperty(Student.prototype, "fullName", {
        get: function () {
            return "".concat(this.lastName, " ").concat(this.firstName);
        },
        set: function (value) {
            var _a;
            var RE = /^([a-zA-Z']+)\s{1}([a-zA-Z']+)$/i;
            if (RE.test(value))
                _a = value.split(' '), this.lastName = _a[0], this.firstName = _a[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "age", {
        get: function () {
            return new Date().getFullYear() - this.birthYear;
        },
        enumerable: false,
        configurable: true
    });
    Student.prototype.setGrade = function (subject, grade) {
        this.grades[subject] = grade;
    };
    Student.prototype.markAttendance = function (present) {
        this.attendance.push(present);
    };
    Student.prototype.getPerformanceRating = function () {
        var gradeValues = Object.values(this.grades);
        if (gradeValues.length === 0)
            return 0;
        var averageGrade = gradeValues.reduce(function (sum, grade) { return sum + grade; }, 0) / gradeValues.length;
        var attendancePercentage = (this.attendance.filter(function (present) { return present; }).length / this.attendance.length) * 100;
        return (averageGrade + attendancePercentage) / 2;
    };
    return Student;
}());
