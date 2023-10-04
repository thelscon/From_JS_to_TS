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
    function Direction(_name) {
        this._name = _name;
        this.levels = [];
    }
    Object.defineProperty(Direction.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Direction.prototype.addLevel = function (level) {
        this.levels.push(level);
    };
    return Direction;
}());
var Level = /** @class */ (function () {
    function Level(_name, _program) {
        this._name = _name;
        this._program = _program;
        this.groups = [];
    }
    Object.defineProperty(Level.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "program", {
        get: function () {
            return this._program;
        },
        enumerable: false,
        configurable: true
    });
    Level.prototype.addGroup = function (group) {
        this.groups.push(group);
    };
    return Level;
}());
var ArrayOf = /** @class */ (function (_super) {
    __extends(ArrayOf, _super);
    function ArrayOf(value) {
        var _this = this;
        if (value) {
            if (typeof value === 'number')
                _this = _super.call(this, value) || this;
            else
                _this = _super.apply(this, value) || this;
        }
        else {
            _this = _super.call(this) || this;
        }
        Object.defineProperty(_this, 'toSorted', {
            writable: true,
            enumerable: false
        });
        _this.toSorted = function (predicate) {
            var returnArray = new ArrayOf;
            returnArray.push.apply(returnArray, _this);
            return returnArray.sort(predicate);
        };
        return _this;
    }
    return ArrayOf;
}(Array));
var Group = /** @class */ (function () {
    function Group(directionName, levelName) {
        this.directionName = directionName;
        this.levelName = levelName;
        this._students = new ArrayOf;
    }
    Object.defineProperty(Group.prototype, "students", {
        get: function () {
            return this._students;
        },
        enumerable: false,
        configurable: true
    });
    Group.prototype.addStudent = function (student) {
        this._students.push(student);
    };
    Group.prototype.showPerformance = function () {
        var sortedStudents = this.students.toSorted(function (a, b) { return b.getPerformanceRating() - a.getPerformanceRating(); });
        return sortedStudents;
    };
    return Group;
}());
var Student = /** @class */ (function () {
    function Student(firstName, lastName, birthYear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.grades = {};
        this.attendance = [];
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
