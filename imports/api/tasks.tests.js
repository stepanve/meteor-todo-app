import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Tasks } from './tasks.js';

// TEST_WATCH=1 meteor test --driver-package meteortesting:mocha
if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday'
                });
            });

            it('can delete owned task', () => {

                const deleteTask = Meteor.isServer.method_hadlers['tasks.remoce'];

                const invocation = { userId };

                deleteTask.apply(invocation, [taskId]);

                assert.equal(Tasks.find().count(), 0);
            });

        });
    });
}