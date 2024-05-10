# 5-3-2024 Security Statement API Key Storage
> Our original API key storage had us storing the key within the code but limiting access if you have a specific IP address. This is secure however it requires an admin to constantly update this. We have since changed that. The API will now allow access to all but we have limited the search so you are only able to search location with the API.

## Concerns
> The API key is in the open and this is very insecure. Limiting it to just the API services we need is a good stop-gap but it is not good security practices. We need to implement a way to hide the API key.
>
> A good thing to look into is using secrets on GitHub pages which may help to mitigate this. 
