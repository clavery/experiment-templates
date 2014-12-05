#!/usr/bin/env python
import sys
from rq import Queue, Connection, Worker


class MyWorker(Worker):
    def perform_job(self, *args, **kwargs):
        # before tasks
        result = super(MyWorker, self).perform_job(*args, **kwargs)
        # after tasks
        return result


with Connection():
    w = MyWorker(Queue())
    w.work()
