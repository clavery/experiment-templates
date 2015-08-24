#!/usr/bin/env python

import os
import sys

try:
    from setuptools import setup, find_packages
except ImportError:
    from distutils.core import setup, find_packages

setup(
    name='pytesting',
    version='0.0.1',
    description='Templated Python Project',
    author='Charles Lavery',
    author_email='charles.lavery@gmail.com',
    url='',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[ ],
    license='MIT License',
    zip_safe=False,
    classifiers=(
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7'
    ),
    entry_points = {
        #'console_scripts': ['pytesting = foobar.cli:main'],
    },
)
