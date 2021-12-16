## Subvis staking dashboard

This is the source code of the Subvis staking dashboard, built during GR12 (Grants Round 12) for the [Polkadot staking dashboard bounty](https://gitcoin.co/issue/subquery/grants/3/100027173) offered by [Subquery Network](https://subquery.network/).

### Demo
[Live demo](https://polkadot-staking-dashboard.vercel.app/)


---

### Introduction

This dashboard provides: 

- User friendly and lightweight interface which displays staking data
    - User are able to view and download history data of total staking amount
    - User are able to view current staking return rate and inflation rate
    - User are able to view a list of all validators and their history data
![image](https://user-images.githubusercontent.com/46732651/146459386-65540032-daec-4d65-8211-2957f3ede377.png)
![image](https://user-images.githubusercontent.com/46732651/146460376-5c2c39bb-d8cb-4081-861a-41f86a306ee4.png)


- Calculator
    - User are able to calculate return based on current staking return rate
![image](https://user-images.githubusercontent.com/46732651/146459792-7001d160-0afe-4142-b210-ef5ec573227f.png)


- Staking data includes both Polkadot and Kusama. They're all indexed from project built on Subquery by ourselves
    - User are able to view data on both chains by choosing from the dropdown  
![image](https://user-images.githubusercontent.com/46732651/146459656-ac8fa4d6-bd16-480f-ae92-2e409c28238c.png)


⚠️ 
### Known issue:
Loading handler

---


### Future plan

**Short-term goal**:  

1. Provide deeper insight into staking and help nominators find the ideal validators. 
    - Define several parameters to help user easily find the target validators.
        - User can filter/sort validators by different criteria e.g. most reputable, most profitable etc...
    - More visualised data
    - Include data of a validator's participation in governance

2. Widen the options of staking in the ecosystem
    - Add parachains (Moonriver, Karura) staking data into the dashboard by indexing them from Subquery

**Long-term goal:** 

1. Portfolio management
    - Enable connecting wallet to nominate or manage validators/collators.
    - Check validator/collator health with more in-depth data

2. Predict return more accurately
    - Advanced version of the calculator: user are able to calculate return based on the validator(s) they choose

3. Extend the staking data we cover
    - Include off-chain data of a validator


---

### Created with 💙 by Subvis team

Dev: [Cherry Liang](https://github.com/CaiYiLiang)

PM: Lillian Wang

### About Subvis
SubVis is a platform where investors go to in order to explore, analyse, and learn about Polkadot ecosystem. 

[Website](https://subvis.io/) 

[Contact us](mailto:lillian@subvis.io)
