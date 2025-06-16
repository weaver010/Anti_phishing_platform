@extends('errors.layout')

@section('title', 'Too Many Requests')
@section('code', '429')
@section('message', 'You have made too many requests recently. Please wait a moment and try again.')