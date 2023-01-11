@extends('emails.layout')

@section('body')
    <div style="font-family:Arial, Helvetica, sans-serif; font-size: 12px; color:#000">
        <h1 style="margin-bottom: 12px;">Hi there,</h1>
        <p style="margin-bottom: 12px;"">This is a developer alert.</p>

        <hr style="margin: 12px 0px;">
        <p><strong>Message:</strong><br/> {{ $msg }}</p>
        <hr style="margin: 12px 0px;">
        <p><strong>Payload:</strong><br/> {{ $payload }}</p>
        <hr style="margin: 12px 0px;">
        <p><strong>Context:</strong><br/> {{ $context }}</p>
        <hr style="margin: 12px 0px;">
    </div>
@endsection
