var quantity = 457;
var sizes = [0.5, 1, 2, 5];
var logistic_constraints = [50, 50, 50, 20];
var topups = [10, 10, 10, 10];
var available_capacity = [60, 65, 55, 20];
console.log(allocate(quantity, sizes, logistic_constraints, topups, available_capacity));




function allocate(quantity, sizes, logistic_constraints, topups, available_capacity) {

    // Creating ration object for storing final result
    var ration = {
        reminder: 0,
        variant: sizes,
        uoms: logistic_constraints,
        allocations: [],
        post_alloc_capacity: []
    };

    // variables used in this function are:
    var allocated, reminder_result = 0,
        index, temp, initial, jsonformat, result;

    // Iterating over the arrays
    for (index = 0; index < logistic_constraints.length; index++) {

        if (available_capacity[index] < logistic_constraints[index]) { // if logistic_constraints higher than the available capacity then no possible to allocate ex: 50<40
            ration.allocations.push(0); // Storing allocation result 
        } else {
            temp = (available_capacity[index] % topups[index]); // Getting the exceed weight from available_capacity ex:63->3
            for (initial = logistic_constraints[index]; initial <= available_capacity[index] - temp && initial < logistic_constraints[index] * 2; initial += topups[index]) {
                allocated = initial;
            }
            ration.allocations.push(allocated); // Storing allocation result 
        }

        ration.post_alloc_capacity.push(available_capacity[index] - ration.allocations[index]); // Storing post_allocation result 
        reminder_result += ration.allocations[index] * sizes[index];
    }
    ration.reminder = quantity - reminder_result; // Storing reminder result 
    jsonformat = JSON.stringify(ration); // coverting into jsonformat

    return jsonformat;
}