@extends('errors.layout')

@section('title', 'Unauthorized')
@section('code', '401')
@section('message', 'Authentication is required to access this resource. Please log in to continue.')